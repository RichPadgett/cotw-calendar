/*
 * A normalized SVG drawing surface for reviewing and replacing letterforms.
 * Pointer/touch coordinates are stored in a 320x320 view box so saved vectors
 * remain resolution-independent on phones, tablets, and the web.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PanResponder,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Circle, G, Line, Path, Text as SvgText } from "react-native-svg";

import { apiUrl } from "../../config/api";
import { PALEO_HEBREW_LETTERS } from "../../data/paleoHebrewStrokeData";

type LetterScript = "modern" | "paleo";
type Point = { x: number; y: number };
type Stroke = { points: Point[] };

type SavedShape = {
  script: LetterScript;
  order: number;
  strokes: Stroke[];
  updatedAt: string;
};

type LetterChoice = {
  order: number;
  name: string;
  modern: string;
  paleo: string;
};

const VIEW_BOX_SIZE = 320;

export default function LetterDrawingStudio({
  adminToken,
  groupCode,
  isAdmin,
}: {
  adminToken: string;
  groupCode: string;
  isAdmin: boolean;
}) {
  const { width } = useWindowDimensions();
  const [script, setScript] = useState<LetterScript>("paleo");
  const [shapes, setShapes] = useState<SavedShape[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeStroke, setActiveStroke] = useState<Point[]>([]);
  const [canvasSize, setCanvasSize] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const letters = useMemo<LetterChoice[]>(
    () =>
      PALEO_HEBREW_LETTERS.map((letter) => ({
        order: letter.order,
        name: letter.name,
        modern: letter.modern,
        paleo: letter.paleo,
      })),
    []
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(
          apiUrl(
            `/hebrew/letter-shapes?groupCode=${encodeURIComponent(groupCode)}`
          )
        );
        const data = await response.json();
        if (!cancelled && response.ok) setShapes(data.shapes ?? []);
      } catch {
        if (!cancelled) setMessage("Saved letter shapes could not be loaded.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [groupCode]);

  const selectedLetter = letters.find(
    (letter) => letter.order === selectedOrder
  );
  const savedShape = shapes.find(
    (shape) => shape.script === script && shape.order === selectedOrder
  );
  const drawingSize = Math.min(620, Math.max(280, width - 64));

  const strokesRef = useRef(strokes);
  const activeStrokeRef = useRef(activeStroke);
  const canvasSizeRef = useRef(canvasSize);
  const canDrawRef = useRef(isAdmin);

  useEffect(() => {
    strokesRef.current = strokes;
  }, [strokes]);
  useEffect(() => {
    activeStrokeRef.current = activeStroke;
  }, [activeStroke]);
  useEffect(() => {
    canvasSizeRef.current = canvasSize;
  }, [canvasSize]);
  useEffect(() => {
    canDrawRef.current = isAdmin;
  }, [isAdmin]);

  function pointFromEvent(event: {
    nativeEvent: { locationX: number; locationY: number };
  }) {
    const size = canvasSizeRef.current || drawingSize;
    return {
      x: Math.max(
        0,
        Math.min(
          VIEW_BOX_SIZE,
          (event.nativeEvent.locationX / size) * VIEW_BOX_SIZE
        )
      ),
      y: Math.max(
        0,
        Math.min(
          VIEW_BOX_SIZE,
          (event.nativeEvent.locationY / size) * VIEW_BOX_SIZE
        )
      ),
    };
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => canDrawRef.current,
      onMoveShouldSetPanResponder: () => canDrawRef.current,
      onPanResponderGrant: (event) => {
        const point = pointFromEvent(event);
        activeStrokeRef.current = [point];
        setActiveStroke([point]);
        setMessage(null);
      },
      onPanResponderMove: (event) => {
        const point = pointFromEvent(event);
        const current = activeStrokeRef.current;
        const last = current[current.length - 1];
        if (last && Math.hypot(point.x - last.x, point.y - last.y) < 1.25)
          return;
        const next = [...current, point];
        activeStrokeRef.current = next;
        setActiveStroke(next);
      },
      onPanResponderRelease: () => finishStroke(),
      onPanResponderTerminate: () => finishStroke(),
    })
  ).current;

  function finishStroke() {
    const completed = activeStrokeRef.current;
    if (completed.length) {
      const next = [...strokesRef.current, { points: completed }];
      strokesRef.current = next;
      setStrokes(next);
    }
    activeStrokeRef.current = [];
    setActiveStroke([]);
  }

  function openLetter(order: number) {
    const saved = shapes.find(
      (shape) => shape.script === script && shape.order === order
    );
    setSelectedOrder(order);
    setStrokes(saved?.strokes ?? []);
    setActiveStroke([]);
    setMessage(null);
  }

  function chooseScript(nextScript: LetterScript) {
    setScript(nextScript);
    setSelectedOrder(null);
    setStrokes([]);
    setActiveStroke([]);
    setMessage(null);
  }

  async function saveShape() {
    if (!selectedOrder || !strokes.length || !isAdmin) return;
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        apiUrl(
          `/hebrew/letter-shapes/${script}/${selectedOrder}?groupCode=${encodeURIComponent(groupCode)}`
        ),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ strokes }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.error ?? "The letter shape could not be saved.");
        return;
      }

      setShapes((current) => [
        ...current.filter(
          (shape) => shape.script !== script || shape.order !== selectedOrder
        ),
        data.shape,
      ]);
      setMessage(
        `${selectedLetter?.name ?? "Letter"} saved with ${strokes.length} strokes.`
      );
    } catch {
      setMessage("The letter shape could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  if (selectedOrder && selectedLetter) {
    return (
      <View style={styles.studioShell}>
        <View style={styles.editorHeader}>
          <Pressable
            onPress={() => setSelectedOrder(null)}
            style={styles.secondaryButton}
          >
            <MaterialIcons name="arrow-back" size={18} color="#334155" />
            <Text style={styles.secondaryButtonText}>All letters</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.editorTitle}>
              {selectedLetter.order}. {selectedLetter.name}
            </Text>
            <Text style={styles.helperText}>
              {script === "modern" ? "Hebrew" : "Paleo Hebrew"} · draw each line
              as a separate stroke
            </Text>
            <View style={styles.brushLabel}>
              <MaterialIcons name="brush" size={14} color="#7c2d12" />
              <Text style={styles.brushLabelText}>
                Ink brush · smooth vector
              </Text>
            </View>
          </View>
        </View>

        <View
          {...panResponder.panHandlers}
          onLayout={(event) => setCanvasSize(event.nativeEvent.layout.width)}
          style={[styles.canvas, { width: drawingSize, height: drawingSize }]}
        >
          <Svg width="100%" height="100%" viewBox="0 0 320 320">
            {[80, 160, 240].map((position) => (
              <Line
                key={`v-${position}`}
                x1={position}
                y1={0}
                x2={position}
                y2={320}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            ))}
            {[80, 160, 240].map((position) => (
              <Line
                key={`h-${position}`}
                x1={0}
                y1={position}
                x2={320}
                y2={position}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            ))}
            <Line
              x1={160}
              y1={0}
              x2={160}
              y2={320}
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <Line
              x1={0}
              y1={160}
              x2={320}
              y2={160}
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />

            {[
              ...strokes,
              ...(activeStroke.length ? [{ points: activeStroke }] : []),
            ].map((stroke, index) => (
              <VectorStroke
                key={index}
                stroke={stroke}
                number={index + 1}
                active={index === strokes.length}
              />
            ))}
          </Svg>
        </View>

        {!isAdmin ? (
          <Text style={styles.readOnlyNotice}>
            An administrator can edit and save letter shapes.
          </Text>
        ) : (
          <Text style={styles.helperText}>
            Start a new line by lifting your finger or pointer. Stroke numbers
            are added automatically.
          </Text>
        )}

        <View style={styles.actionRow}>
          <Pressable
            disabled={!isAdmin || strokes.length === 0}
            onPress={() => setStrokes((current) => current.slice(0, -1))}
            style={({ pressed }) => [
              styles.secondaryButton,
              (!isAdmin || !strokes.length) && styles.disabled,
              pressed && { opacity: 0.75 },
            ]}
          >
            <MaterialIcons name="undo" size={18} color="#334155" />
            <Text style={styles.secondaryButtonText}>Undo stroke</Text>
          </Pressable>
          <Pressable
            disabled={!isAdmin || strokes.length === 0}
            onPress={() => setStrokes([])}
            style={[
              styles.secondaryButton,
              (!isAdmin || !strokes.length) && styles.disabled,
            ]}
          >
            <MaterialIcons name="delete-sweep" size={18} color="#b91c1c" />
            <Text style={[styles.secondaryButtonText, { color: "#b91c1c" }]}>
              Clear
            </Text>
          </Pressable>
          <Pressable
            disabled={!isAdmin || !strokes.length || isSaving}
            onPress={saveShape}
            style={[
              styles.saveButton,
              (!isAdmin || !strokes.length || isSaving) && styles.disabled,
            ]}
          >
            <MaterialIcons name="save" size={18} color="#ffffff" />
            <Text style={styles.saveButtonText}>
              {isSaving ? "Saving…" : `Save ${strokes.length} strokes`}
            </Text>
          </Pressable>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
        {savedShape ? (
          <Text style={styles.savedAt}>
            Last saved {new Date(savedShape.updatedAt).toLocaleString()}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ gap: 14 }}>
      <View style={styles.scriptRow}>
        <ScriptButton
          label="Hebrew letters"
          active={script === "modern"}
          onPress={() => chooseScript("modern")}
        />
        <ScriptButton
          label="Paleo Hebrew letters"
          active={script === "paleo"}
          onPress={() => chooseScript("paleo")}
        />
      </View>
      <View>
        <Text style={styles.sectionTitle}>Choose a blank letter tile</Text>
        <Text style={styles.helperText}>
          The tile opens into a large vector canvas. Existing artwork is
          intentionally hidden so the expert can define the corrected shape.
        </Text>
      </View>
      <View style={styles.tileGrid}>
        {letters.map((letter) => {
          const savedShape = shapes.find(
            (shape) => shape.script === script && shape.order === letter.order
          );
          return (
            <Pressable
              key={letter.order}
              onPress={() => openLetter(letter.order)}
              style={({ pressed }) => [
                styles.blankTile,
                pressed && {
                  borderColor: "#0f766e",
                  backgroundColor: "#f0fdfa",
                },
              ]}
            >
              <Text style={styles.tileOrder}>{letter.order}</Text>
              <View style={styles.blankSpace}>
                {savedShape ? (
                  <SavedShapePreview strokes={savedShape.strokes} />
                ) : (
                  <MaterialIcons name="draw" size={24} color="#cbd5e1" />
                )}
              </View>
              <Text style={styles.tileName}>{letter.name}</Text>
              {savedShape ? (
                <Text style={styles.savedBadge}>SAVED</Text>
              ) : (
                <Text style={styles.emptyBadge}>BLANK</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function SavedShapePreview({ strokes }: { strokes: Stroke[] }) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 320"
      preserveAspectRatio="xMidYMid meet"
    >
      {strokes.map((stroke, index) => {
        if (!stroke.points.length) return null;
        const path = smoothStrokePath(stroke.points);

        return stroke.points.length === 1 ? (
          <Circle
            key={index}
            cx={stroke.points[0].x}
            cy={stroke.points[0].y}
            r={5}
            fill="#0f172a"
          />
        ) : (
          <G key={index}>
            <Path
              d={path}
              fill="none"
              stroke="#3b2416"
              strokeWidth={13}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={path}
              fill="none"
              stroke="#1f130d"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={path}
              fill="none"
              stroke="#8b5e3c"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.38}
            />
          </G>
        );
      })}
    </Svg>
  );
}

function VectorStroke({
  stroke,
  number,
  active,
}: {
  stroke: Stroke;
  number: number;
  active: boolean;
}) {
  const first = stroke.points[0];
  const path = smoothStrokePath(stroke.points);
  const edgeColor = active ? "#115e59" : "#3b2416";
  const inkColor = active ? "#0f766e" : "#1f130d";
  return (
    <>
      {stroke.points.length === 1 ? (
        <Circle cx={first.x} cy={first.y} r={5} fill="#0f172a" />
      ) : (
        <G>
          <Path
            d={path}
            fill="none"
            stroke={edgeColor}
            strokeWidth={13}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
          />
          <Path
            d={path}
            fill="none"
            stroke={inkColor}
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={path}
            fill="none"
            stroke={active ? "#5eead4" : "#8b5e3c"}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.38}
          />
        </G>
      )}
      <Circle
        cx={first.x}
        cy={first.y}
        r={12}
        fill="#ffffff"
        stroke="#dc2626"
        strokeWidth={2}
      />
      <SvgText
        x={first.x}
        y={first.y + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight="700"
        fill="#dc2626"
      >
        {number}
      </SvgText>
    </>
  );
}

function smoothStrokePath(points: Point[]) {
  if (!points.length) return "";
  if (points.length === 1) {
    return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  }

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    path += ` Q ${point.x.toFixed(1)} ${point.y.toFixed(1)} ${((point.x + next.x) / 2).toFixed(1)} ${((point.y + next.y) / 2).toFixed(1)}`;
  }

  const last = points[points.length - 1];
  return `${path} L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
}

function ScriptButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.scriptButton, active && styles.scriptButtonActive]}
    >
      <Text style={[styles.scriptButtonText, active && { color: "#ffffff" }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = {
  studioShell: { gap: 14, alignItems: "flex-start" as const },
  editorHeader: {
    width: "100%" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  editorTitle: { fontSize: 22, fontWeight: "900" as const, color: "#0f172a" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900" as const,
    color: "#0f172a",
    marginBottom: 3,
  },
  helperText: { fontSize: 13, color: "#64748b", lineHeight: 19 },
  brushLabel: {
    alignSelf: "flex-start" as const,
    marginTop: 5,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#fff7ed",
  },
  brushLabelText: {
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#7c2d12",
  },
  scriptRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  scriptButton: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  scriptButtonActive: { backgroundColor: "#0369a1", borderColor: "#0369a1" },
  scriptButtonText: {
    fontSize: 13,
    fontWeight: "800" as const,
    color: "#334155",
  },
  tileGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 10,
  },
  blankTile: {
    width: 138,
    minHeight: 158,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    alignItems: "center" as const,
  },
  tileOrder: {
    alignSelf: "flex-start" as const,
    fontSize: 11,
    fontWeight: "900" as const,
    color: "#94a3b8",
  },
  blankSpace: {
    flex: 1,
    width: "100%" as const,
    minHeight: 72,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  tileName: { fontSize: 13, fontWeight: "900" as const, color: "#0f172a" },
  savedBadge: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "900" as const,
    color: "#047857",
    letterSpacing: 0.8,
  },
  emptyBadge: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "900" as const,
    color: "#94a3b8",
    letterSpacing: 0.8,
  },
  canvas: {
    maxWidth: "100%" as const,
    alignSelf: "center" as const,
    borderWidth: 2,
    borderColor: "#94a3b8",
    borderRadius: 14,
    overflow: "hidden" as const,
    backgroundColor: "#fffef8",
    touchAction: "none" as const,
  },
  actionRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  secondaryButton: {
    minHeight: 40,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "800" as const,
    color: "#334155",
  },
  saveButton: {
    minHeight: 40,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: "#0f766e",
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  disabled: { opacity: 0.4 },
  message: { fontSize: 13, fontWeight: "700" as const, color: "#0f766e" },
  savedAt: { fontSize: 11, color: "#94a3b8" },
  readOnlyNotice: {
    fontSize: 13,
    color: "#92400e",
    backgroundColor: "#fffbeb",
    padding: 10,
    borderRadius: 8,
  },
};

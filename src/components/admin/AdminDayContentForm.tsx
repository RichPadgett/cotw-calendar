// src/components/admin/AdminDayContentForm.tsx

import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type Props = {
    enochYear: number;
    month: number;
    day: number;
};

type ScriptureRow = {
    label: string;
    reference: string;
    url: string;
};

type MediaRow = {
    label: string;
    type: "external-link" | "internal-link" | "pdf" | "video-link";
    url: string;
    access: "public" | "members" | "code-required";
};

export default function AdminDayContentForm({
    enochYear,
    month,
    day,
}: Props) {
    const [activeTab, setActiveTab] = useState<"create" | "preview">("create");
    const [notes, setNotes] = useState("");

    const [scriptureReadings, setScriptureReadings] = useState<ScriptureRow[]>([
        { label: "", reference: "", url: "" },
    ]);

    const [mediaItems, setMediaItems] = useState<MediaRow[]>([
        {
            label: "",
            type: "external-link",
            url: "",
            access: "public",
        },
    ]);

    const [isSaving, setIsSaving] = useState(false);

    const [saveMessage, setSaveMessage] = useState("");

    async function uploadFile() {
        const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const file = result.assets[0];

        const formData = new FormData();

        if (file.uri.startsWith("blob:")) {
            const blob = await fetch(file.uri).then((res) => res.blob());

            formData.append(
                "file",
                new File([blob], file.name, {
                    type: file.mimeType ?? blob.type ?? "application/octet-stream",
                })
            );
        } else {
            formData.append(
                "file",
                {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType ?? "application/octet-stream",
                } as any
            );
        }

        const response = await fetch(
            `http://localhost:3001/api/admin/calendar/${enochYear}/${month}/${day}/files`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        setMediaItems((rows) => [
            ...rows,
            {
                label: file.name,
                type: "pdf",
                url: data.url,
                access: "public",
            },
        ]);

        console.log("Picked file", file);


        console.log("Upload response status", response.status);
    }

    async function saveContent() {
        try {
            setIsSaving(true);
            setSaveMessage("");

            const body = {
                enochYear,
                month,
                day,

                title: `Month ${month} Day ${day}`,

                notes,

                scriptureReadings: scriptureReadings.filter(
                    (row) => row.label || row.reference || row.url
                ),

                sections: [
                    {
                        title: "Files / Links / Media",
                            
                        items: mediaItems.filter(
                            (row) => row.label || row.url
                        ),
                    },
                ],
            };

            const response = await fetch(
                `http://localhost:3001/api/admin/calendar/${enochYear}/${month}/${day}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                setSaveMessage("Save failed");
                return;
            }

            setSaveMessage("Saved successfully");

            setTimeout(() => {
                setSaveMessage("");
            }, 2500);

        } catch (error) {
            console.log(error);

            setSaveMessage("Unexpected error");
        } finally {
            setIsSaving(false);
        }
    }

    function addScriptureRow() {
        setScriptureReadings((rows) => [
            ...rows,
            { label: "", reference: "", url: "" },
        ]);
    }

    function removeScriptureRow(index: number) {
        setScriptureReadings((rows) =>
            rows.filter((_, rowIndex) => rowIndex !== index)
        );
    }

    function addMediaRow() {
        setMediaItems((rows) => [
            ...rows,
            {
                label: "",
                type: "external-link",
                url: "",
                access: "public",
            },
        ]);
    }

    function removeMediaRow(index: number) {
        setMediaItems((rows) => rows.filter((_, rowIndex) => rowIndex !== index));
    }

    return (
        <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable onPress={() => setActiveTab("create")}>
                    <Text style={{ fontWeight: activeTab === "create" ? "800" : "500" }}>
                        Create
                    </Text>
                </Pressable>

                <Pressable onPress={() => setActiveTab("preview")}>
                    <Text style={{ fontWeight: activeTab === "preview" ? "800" : "500" }}>
                        Preview
                    </Text>
                </Pressable>
            </View>

            {activeTab === "create" && (
                <View style={{ gap: 18 }}>
                    <View style={sectionCardStyle}>
                        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>
                            Notes
                        </Text>

                        <TextInput
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Add notes for this day..."
                            multiline
                            style={{
                                minHeight: 90,
                                borderWidth: 1,
                                borderColor: "#d1d5db",
                                borderRadius: 12,
                                padding: 12,
                                backgroundColor: "#ffffff",
                                textAlignVertical: "top",
                            }}
                        />
                    </View>

                    <View style={sectionCardStyle}>
                        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>
                            Scripture Readings
                        </Text>



                        {scriptureReadings.map((row, index) => (
                            <View key={index} style={rowCardStyle}>
                                <TextInput
                                    value={row.label}
                                    onChangeText={(value) => {
                                        const next = [...scriptureReadings];
                                        next[index].label = value;
                                        setScriptureReadings(next);
                                    }}
                                    placeholder="Label"
                                    style={inputStyle}
                                />

                                <TextInput
                                    value={row.reference}
                                    onChangeText={(value) => {
                                        const next = [...scriptureReadings];
                                        next[index].reference = value;
                                        setScriptureReadings(next);
                                    }}
                                    placeholder="Reference"
                                    style={inputStyle}
                                />

                                <TextInput
                                    value={row.url}
                                    onChangeText={(value) => {
                                        const next = [...scriptureReadings];
                                        next[index].url = value;
                                        setScriptureReadings(next);
                                    }}
                                    placeholder="URL"
                                    style={inputStyle}
                                />

                                <Pressable onPress={() => removeScriptureRow(index)}>
                                    <Text style={{ color: "#dc2626", fontWeight: "700" }}>
                                        Remove Scripture Row
                                    </Text>
                                </Pressable>
                            </View>
                        ))}

                        <Pressable onPress={addScriptureRow}>
                            <Text style={{ color: "#2563eb", fontWeight: "800" }}>
                                + Add Scripture
                            </Text>
                        </Pressable>
                    </View>

                    <View style={sectionCardStyle}>
                        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>
                            Files / Links / Media
                        </Text>

                        {mediaItems.map((row, index) => (
                            <View key={index} style={rowCardStyle}>
                                <TextInput
                                    value={row.label}
                                    onChangeText={(value) => {
                                        const next = [...mediaItems];
                                        next[index].label = value;
                                        setMediaItems(next);
                                    }}
                                    placeholder="Label"
                                    style={inputStyle}
                                />

                                <TextInput
                                    value={row.url}
                                    onChangeText={(value) => {
                                        const next = [...mediaItems];
                                        next[index].url = value;
                                        setMediaItems(next);
                                    }}
                                    placeholder="URL"
                                    style={inputStyle}
                                />

                                <Pressable onPress={() => removeMediaRow(index)}>
                                    <Text style={{ color: "#dc2626", fontWeight: "700" }}>
                                        Remove Media Row
                                    </Text>
                                </Pressable>
                            </View>
                        ))}

                        <Pressable onPress={uploadFile}>
                            <Text style={{ color: "#7c3aed", fontWeight: "800" }}>
                                Upload File
                            </Text>
                        </Pressable>

                        <Pressable onPress={addMediaRow}>
                            <Text style={{ color: "#2563eb", fontWeight: "800" }}>
                                + Add Media
                            </Text>
                        </Pressable>
                    </View>

                    <Pressable onPress={() => setActiveTab("preview")}>
                        <Text style={{ fontSize: 18, fontWeight: "800", color: "#16a34a" }}>
                            Preview Before Save →
                        </Text>
                    </Pressable>
                </View>
            )}

            {activeTab === "preview" && (
                <View style={{ gap: 12 }}>
                    <Text style={{ fontSize: 20, fontWeight: "800" }}>Preview</Text>

                    <Text>{notes || "No notes yet."}</Text>

                    {scriptureReadings.map((row, index) => (
                        <Text key={index}>
                            {row.label || "Untitled Scripture"} — {row.reference}
                        </Text>
                    ))}

                    {mediaItems.map((row, index) => (
                        <Text key={index}>
                            {row.label || "Untitled Media"} — {row.access}
                        </Text>
                    ))}

                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: "#e5e7eb",

                            paddingTop: 18,
                            marginTop: 18,

                            backgroundColor: "#ffffff",
                        }}
                    >
                        {saveMessage ? (
                            <Text
                                style={{
                                    marginBottom: 10,
                                    color: "#16a34a",
                                    fontWeight: "700",
                                    textAlign: "center",
                                }}
                            >
                                {saveMessage}
                            </Text>
                        ) : null}

                        <Pressable
                            onPress={saveContent}

                            disabled={isSaving}

                            style={{
                                width: "100%",

                                backgroundColor: "#2563eb",

                                paddingVertical: 18,

                                borderRadius: 14,

                                alignItems: "center",

                                opacity: isSaving ? 0.6 : 1,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",

                                    fontSize: 18,

                                    fontWeight: "800",
                                }}
                            >
                                {isSaving ? "Saving..." : "Save Content"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const inputStyle = {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 10,
};

const sectionCardStyle = {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
};

const rowCardStyle = {
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
};
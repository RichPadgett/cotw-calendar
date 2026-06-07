/*
 * File: src/components/commands/CommandExplorerView.tsx
 * Purpose: Simple command-resource explorer for visually walking Prolog command flows.
 */

import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { apiUrl } from "../../config/api";

type CommandSummary = {
  key: string;
  title: string;
};

type CommandQuestion = {
  key: string;
  title: string;
  description: string;
};

type CommandRequirement = {
  key: string;
  title: string;
  description: string;
};

type CommandResource = {
  key: string;
  title?: string;
  normalObedience?: string;
  canObeyToday: boolean;
  firstQuestion?: CommandQuestion | null;
  nextQuestion?: CommandQuestion | null;
  flowComplete?: boolean;
  embodies?: string[];
  blockedRequirements?: CommandRequirement[];
  scriptureReferences?: string[];
  studyNotes?: string[];
};

type CommandAnswer = {
  question: string;
  answer: "yes" | "no";
};

type CommandListResponse = {
  commands: CommandSummary[];
};

export default function CommandExplorerView() {
  const [commands, setCommands] = useState<CommandSummary[]>([]);
  const [selectedCommandKey, setSelectedCommandKey] = useState<string | null>(
    null
  );
  const [command, setCommand] = useState<CommandResource | null>(null);
  const [answers, setAnswers] = useState<CommandAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadCommands();
  }, []);

  async function loadCommands() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(apiUrl("/command-resources"));

      if (!response.ok) {
        throw new Error("Failed to load command resources.");
      }

      const data: CommandListResponse = await response.json();

      setCommands(data.commands);

      if (data.commands[0]) {
        await selectCommand(data.commands[0].key);
      }
    } catch (error) {
      console.log("Failed to load command resources", error);
      setErrorMessage("Command resources could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }

  async function selectCommand(commandKey: string) {
    try {
      setSelectedCommandKey(commandKey);
      setAnswers([]);
      setCommand(null);
      setErrorMessage(null);

      const response = await fetch(apiUrl(`/command-resources/${commandKey}`));

      if (!response.ok) {
        throw new Error("Failed to load command resource.");
      }

      const data: CommandResource = await response.json();
      setCommand(data);
    } catch (error) {
      console.log("Failed to select command resource", error);
      setErrorMessage("This command resource could not be loaded.");
    }
  }

  async function answerQuestion(answer: "yes" | "no") {
    const question = command?.nextQuestion ?? command?.firstQuestion;

    if (!selectedCommandKey || !question) return;

    const nextAnswers = [
      ...answers,
      {
        question: question.key,
        answer,
      },
    ];

    try {
      setAnswers(nextAnswers);
      setErrorMessage(null);

      const response = await fetch(
        apiUrl(`/command-resources/${selectedCommandKey}/evaluate`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: nextAnswers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to evaluate command resource.");
      }

      const data: CommandResource = await response.json();
      setCommand((current) => ({
        ...current,
        ...data,
        title: current?.title,
        normalObedience: current?.normalObedience,
      }));
    } catch (error) {
      console.log("Failed to evaluate command resource", error);
      setAnswers(answers);
      setErrorMessage("This answer could not be evaluated.");
    }
  }

  async function resetFlow() {
    if (!selectedCommandKey) return;

    await selectCommand(selectedCommandKey);
  }

  const activeQuestion = command?.nextQuestion ?? command?.firstQuestion;
  const flowComplete = command?.flowComplete === true || !activeQuestion;

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#f9fafb",
          borderWidth: 1,
          borderColor: "#e5e7eb",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            color: "#081a33",
          }}
        >
          Command Explorer
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontSize: 14,
            lineHeight: 20,
            color: "#4b5563",
          }}
        >
          Walk through each command resource and see the final answer from the
          Prolog engine.
        </Text>
      </View>

      {errorMessage && (
        <View
          style={{
            padding: 12,
            borderRadius: 14,
            backgroundColor: "#fef2f2",
            borderWidth: 1,
            borderColor: "#fecaca",
          }}
        >
          <Text style={{ color: "#991b1b", fontWeight: "800" }}>
            {errorMessage}
          </Text>
        </View>
      )}

      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "900",
            color: "#374151",
            textTransform: "uppercase",
          }}
        >
          Commands
        </Text>

        {isLoading ? (
          <Text style={{ color: "#6b7280" }}>Loading commands...</Text>
        ) : (
          <View style={{ gap: 8 }}>
            {commands.map((item) => {
              const isSelected = item.key === selectedCommandKey;

              return (
                <Pressable
                  key={item.key}
                  onPress={() => selectCommand(item.key)}
                  style={{
                    padding: 12,
                    borderRadius: 14,
                    backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
                    borderWidth: 1,
                    borderColor: isSelected ? "#93c5fd" : "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "900",
                      color: "#111827",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    {item.key}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {command && (
        <View
          style={{
            padding: 16,
            borderRadius: 20,
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#e5e7eb",
            gap: 14,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: "#081a33",
              }}
            >
              {command.title ?? command.key}
            </Text>

            {command.normalObedience && (
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#374151",
                }}
              >
                {command.normalObedience}
              </Text>
            )}
          </View>

          <View
            style={{
              padding: 12,
              borderRadius: 16,
              backgroundColor: command.canObeyToday ? "#ecfdf5" : "#fff7ed",
              borderWidth: 1,
              borderColor: command.canObeyToday ? "#bbf7d0" : "#fed7aa",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "900",
                color: command.canObeyToday ? "#166534" : "#9a3412",
              }}
            >
              {command.canObeyToday
                ? "Can obey today"
                : "Cannot fully obey today"}
            </Text>
          </View>

          {activeQuestion && !flowComplete ? (
            <View
              style={{
                padding: 14,
                borderRadius: 16,
                backgroundColor: "#f8fafc",
                borderWidth: 1,
                borderColor: "#e2e8f0",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                }}
              >
                Next Question
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 17,
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                {activeQuestion.title}
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#475569",
                }}
              >
                {activeQuestion.description}
              </Text>

              <View style={{ marginTop: 12, flexDirection: "row", gap: 8 }}>
                <AnswerButton
                  label="Yes"
                  onPress={() => answerQuestion("yes")}
                />
                <AnswerButton label="No" onPress={() => answerQuestion("no")} />
              </View>
            </View>
          ) : (
            <View
              style={{
                padding: 14,
                borderRadius: 16,
                backgroundColor: "#f8fafc",
                borderWidth: 1,
                borderColor: "#e2e8f0",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                Final Answer
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#475569",
                }}
              >
                The command flow is complete. Review the requirements,
                references, and notes below.
              </Text>
            </View>
          )}

          {answers.length > 0 && (
            <View style={{ gap: 6 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  color: "#374151",
                }}
              >
                Answers
              </Text>

              {answers.map((answer, index) => (
                <Text
                  key={`${answer.question}-${index}`}
                  style={{ color: "#4b5563" }}
                >
                  {index + 1}. {answer.question}: {answer.answer}
                </Text>
              ))}

              <Pressable
                onPress={resetFlow}
                style={{ alignSelf: "flex-start" }}
              >
                <Text style={{ color: "#2563eb", fontWeight: "900" }}>
                  Reset flow
                </Text>
              </Pressable>
            </View>
          )}

          <DetailList
            title="Blocked Requirements"
            items={(command.blockedRequirements ?? []).map(
              (requirement) =>
                `${requirement.title}: ${requirement.description}`
            )}
            emptyText="No blocked requirements."
          />

          <DetailList
            title="Scripture References"
            items={command.scriptureReferences ?? []}
            emptyText="No scripture references."
          />

          <DetailList
            title="Study Notes"
            items={command.studyNotes ?? []}
            emptyText="No study notes."
          />

          <DetailList
            title="Embodies"
            items={command.embodies ?? []}
            emptyText="No embodiment tags."
          />
        </View>
      )}
    </View>
  );
}

function AnswerButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        minHeight: 42,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#081a33",
      }}
    >
      <Text style={{ color: "#ffffff", fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

function DetailList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "900",
          color: "#374151",
        }}
      >
        {title}
      </Text>

      {items.length === 0 ? (
        <Text style={{ color: "#6b7280" }}>{emptyText}</Text>
      ) : (
        items.map((item, index) => (
          <Text
            key={`${title}-${index}`}
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: "#4b5563",
            }}
          >
            {index + 1}. {item}
          </Text>
        ))
      )}
    </View>
  );
}

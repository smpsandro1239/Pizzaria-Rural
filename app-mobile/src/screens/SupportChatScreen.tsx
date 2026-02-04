import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useAppTheme } from "../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

type Message = {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
};

export const SupportChatScreen = () => {
  const { colors, spacing, typography, radius } = useAppTheme();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Bem-vindo ao Suporte Rural. Como o podemos ajudar hoje?", sender: "agent", timestamp: "10:00" },
  ]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Resposta automática simulada
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "Obrigado pela sua mensagem. Um dos nossos especialistas rurais irá responder-lhe em breve.",
        sender: "agent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ padding: spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <MotiView
            key={msg.id}
            from={{ opacity: 0, scale: 0.9, translateY: 10 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            style={[
              styles.messageBubble,
              {
                backgroundColor: msg.sender === "user" ? colors.ruralRed : colors.surface,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                borderBottomLeftRadius: msg.sender === "agent" ? 0 : radius.md,
                borderBottomRightRadius: msg.sender === "user" ? 0 : radius.md,
                borderRadius: radius.md,
                marginBottom: spacing.md,
                maxWidth: "80%",
              },
            ]}
          >
            <Text style={[typography.body, { color: msg.sender === "user" ? "white" : colors.text }]}>
              {msg.text}
            </Text>
            <Text style={[typography.caption, { color: msg.sender === "user" ? "rgba(255,255,255,0.7)" : colors.textSecondary, alignSelf: "flex-end", marginTop: 4, fontSize: 10 }]}>
              {msg.timestamp}
            </Text>
          </MotiView>
        ))}
      </ScrollView>

      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border, padding: spacing.md }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderRadius: radius.pill, paddingHorizontal: spacing.lg }]}
          placeholder="Escreva a sua mensagem..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, { backgroundColor: colors.ruralRed, borderRadius: radius.pill }]}
        >
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

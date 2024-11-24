export const generateAIResult = async (message: string) => {
  try {
    const authHeader = `Bearer ${process.env.CHATGPT_API_KEY}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a unique title for the following text (possibly shorter than 50 characters) ${message}`,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.replace(/^["']|["']$/g, "");
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to generate response from OpenAI.");
  }
};

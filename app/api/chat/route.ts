import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();

  const chatResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: body.messages,
  });

  return NextResponse.json({
    ...chatResponse.data.choices[0].message,
  });
}

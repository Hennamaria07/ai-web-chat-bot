'use client';

import { Message, useChat } from 'ai/react';
import React from 'react'
import { Messages } from './Messages';
import ChatInput from './ChatInput';

const ChatWrapper = ({sessionId, initialMessages}: {sessionId: string, initialMessages: Message[]}) => {
  const {messages, input, handleInputChange, handleSubmit, setInput} = useChat({
    api: "/api/chat-stream",
    body: {sessionId},
    initialMessages
  })
  return (
    <div className='relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 justify-between flex-col gap-2'>
      <div className="flex-1 text-black bg-zinc-800 flex flex-col justify-between">
        <Messages messages={messages} />
      </div>
    <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput}/>
    </div>
  )
}

export default ChatWrapper

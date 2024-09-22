import { type Message as TMessage } from "ai/react"
import Message from "./Message"
import { MessageSquare } from "lucide-react"

interface Messages {
    messages: TMessage[]
}

export const Messages = ({messages} : Messages) => {
  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
        {messages.length ? messages.map((message, i) => (
            <Message key={i} content={message.content} isUserMessage={message.role === "user"} />
        )) : (
            <div className="flex flex-1 flex-col gap-2 items-center justify-center">
              <MessageSquare className="size-5 text-blue-500" />
              <h3 className="font-semibold text-xl dark:text-white">You're all set!</h3>
              <p className="text-zinc-500 text-sm">Ask your first question to get started.</p>
            </div>
        )}
    </div>
  )
}

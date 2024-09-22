import ChatWrapper from '@/components/ChatWrapper';
import { formatURL } from '@/utils/formatUrl';
import { ragChat } from '@/utils/ragChat';
import { redis } from '@/utils/redis';
import { cookies } from 'next/headers';
import React from 'react';

interface PageProps {
    params: {
        url: string[] | string | undefined
    }
}

const Page = async ({params} : PageProps) => {
  const sessionCookie = cookies().get("sessionId")?.value;
    const reconstructedUrl = formatURL(params.url as string[] | undefined);
    const sessionId = (sessionCookie + '--' + sessionCookie).replace(/\//g, '');
    const isAleadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);
    // console.log('isAleadyIndexed--->', isAleadyIndexed)
    const initialMessages = await ragChat.history.getMessages({amount: 10, sessionId: sessionId});
   if(!isAleadyIndexed){
    await ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: {chunkOverlap: 50, chunkSize: 200}
    })

   await redis.sadd("indexed-urls", reconstructedUrl)
   }

  return (
    <div className='w-full h-full'>
      <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
    </div>
  )
}

export default Page

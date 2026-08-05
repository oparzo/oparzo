import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const secret = req.headers.get('x-sanity-webhook-secret')
  
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/products/[slug]', 'page')
  revalidateTag('sanity-data')
  
  return NextResponse.json({ revalidated: true, now: Date.now() })
}

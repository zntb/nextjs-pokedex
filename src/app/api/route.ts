import { NextRequest, NextResponse } from 'next/server';

type Data = {
  name: string;
};

export default function GET(req: NextRequest, res: NextResponse<Data>) {
  return NextResponse.json({ name: 'John Doe' });
}

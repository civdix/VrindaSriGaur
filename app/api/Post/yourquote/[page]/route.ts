import { connectDB } from "@/lib/Database/db";
import Poetry from "@/lib/Database/models/poetry";
import { NextRequest,NextResponse } from "next/server";


export async function GET(request: NextRequest, context: { params: Promise<{ page: string }> }) {
  const { page } = await context.params; 
    const url = `https://www.yourquote.in/yourquote-web/web/basic?page=${page}&sort=latest&userId=bmgmg&supportsWebP=true`
    const response = await fetch(url);
    const data = await response.json();
    const author = data.user.name;
    const filteredData = data.posts.map((post:any) => ({
        title: post.title.length>0 ? post.title : "No Title",
        author: author,
        img_url:post.image_large,
        poetry: post.text,
        timestamp: post.timestamp,
        link: post.link,
        caption: post.caption,
    }));
    return NextResponse.json(filteredData);
}

export async function POST(request: NextRequest){
    await connectDB();
const {title,img_url,poetry,author,timestamp,link,caption} = await request.json();
try{
    await Poetry.create({title,img_url,poetry,author,timestamp,link,caption});
    return NextResponse.json({message:"Poetry created successfully"}, {status: 201});
}catch(err:any){
    console.log("ERROR WHEN CREATING POST",err.errors)
    return NextResponse.json({error:"Unable to create Poetry but " + err.errors}, {status: 500})
}}
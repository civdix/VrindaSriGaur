import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/Database/db";
import Poetry from "@/lib/Database/models/poetry";

export async function GET(request: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize") || '3' ;

    if (id) {   
        try {
            const poetry = await Poetry.findById(id);
        if (!poetry) {
            return NextResponse.json({ error: "Poetry not found" }, { status: 404 });
        }
        return NextResponse.json(poetry);
    } catch (error) {
        console.error("Error fetching poetry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
else if(page){
    try {
        const poetry = await Poetry.find().skip((parseInt(page) - 1) * parseInt(pageSize)).limit(parseInt(pageSize));
        return NextResponse.json(poetry);
    } catch (error) {
        console.error("Error fetching poetry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
}

export async function POST(request: NextRequest){
    await connectDB();
const {title,img_url,poetry,author} = await request.json();
try{
    await Poetry.create({title,img_url,poetry,author});
    return NextResponse.json({message:"Poetry created successfully"}, {status: 201});
}catch(err:any){
    console.log("ERROR WHEN CREATING POST ",err.errors)
    return NextResponse.json({error:"Unable to create Poetry but " + err}, {status: 500})
}
    
















}

export async function DELETE(request: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const secretCode = request.headers.get('responsible');

    if (id && secretCode == "Vrinda") {
        try {
            await Poetry.findByIdAndDelete(id);
            return NextResponse.json({ message: "Poetry deleted successfully" }, { status: 200 });
        } catch (error) {
            console.error("Error deleting poetry:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
}
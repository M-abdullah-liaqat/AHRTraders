import { NextResponse } from 'next/server'
import Products from '@/aboutData/Products'
import ConnectDB from '@/aboutData/ConnectDB'
export async function GET() {
    await ConnectDB();
        let alls=await Products.find({}).then(item=>{return item}).catch(item=>{return item})
    return NextResponse.json(alls)
}

export async function PUT(ID) {
    await ConnectDB();
        let alls=await Products.findOne({_id: ID}).then(item=>{return item}).catch(item=>{return item})
    return NextResponse.json(alls)
}
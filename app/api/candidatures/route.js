import { NextResponse } from "next/server";
import connect from "../../../libs/mongodb";
import Candidature from "../../../models/candidature.model";

export async function GET() {
    try {
        await connect();
        const candidatures = await Candidature.find();
        return NextResponse.json(candidatures, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connect();
        const body = await request.json();
        const newCandidature = await Candidature.create(body);
        return NextResponse.json(newCandidature, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import connect from "../../../../libs/mongodb";
import Candidature from "../../../../models/candidature.model";

export async function GET(req, { params }) {
    try {
        await connect();
        const { id } = await params;
        const candidature = await Candidature.findById(id);
        
        if (!candidature) {
            return NextResponse.json({ error: "Candidature not found" }, { status: 404 });
        }
        
        return NextResponse.json(candidature, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connect();
        const { id } = await params;
        const body = await req.json();
        
        const updatedCandidature = await Candidature.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        
        if (!updatedCandidature) {
            return NextResponse.json({ error: "Candidature not found" }, { status: 404 });
        }
        
        return NextResponse.json(updatedCandidature, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connect();
        const { id } = await params;
        
        const deletedCandidature = await Candidature.findByIdAndDelete(id);
        
        if (!deletedCandidature) {
            return NextResponse.json({ error: "Candidature not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Candidature deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

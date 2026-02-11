import { NextResponse } from "next/server";
import connect from "../../../../libs/mongodb";
import User from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connect();
        const { nom, prenom, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Cet email est déjà utilisé" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
        });

        const userResponse = {
            _id: newUser._id,
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
        };

        return NextResponse.json(
            { message: "Utilisateur créé avec succès", user: userResponse },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

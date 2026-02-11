import { NextResponse } from "next/server";
import connect from "../../../../libs/mongodb";
import User from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connect();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Email ou mot de passe incorrect" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email ou mot de passe incorrect" },
                { status: 401 }
            );
        }

        const userResponse = {
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        };

        return NextResponse.json(
            { message: "Connexion réussie", user: userResponse },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

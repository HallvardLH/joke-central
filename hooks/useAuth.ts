import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		// Fetch session initially
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		// Subscribe to auth state changes
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	// Helper function to get avatar URL
	function getAvatarUrl(avatar: number | string) {
		return `https://oprhztiruewgtiajcdmo.supabase.co/storage/v1/object/public/avatars/${avatar}.png`;
	}

	// Get the current session, or fetch it if not set
	async function getSession() {
		if (session) return session;

		try {
			const { data: { session }, error } = await supabase.auth.getSession();
			if (error) throw error;
			setSession(session);
			return session;
		} catch (error) {
			console.error('Error fetching session:', error);
			return { error };
		}
	}

	// Sign in with email and password
	const signIn = async (email: string, password: string) => {
		email = email.toLowerCase();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Sign-in error:", error);
			return { error };
		}
		return { success: true };
	};

	// Sign up a new user
	const signUp = async (
		email: string,
		username: string,
		password: string,
		avatar: string,
	) => {
		email = email.toLowerCase();

		const { data: { user, session }, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
					email,
					avatar_url: getAvatarUrl(avatar),
				},
			},
		});

		if (error) {
			console.error("Sign-up error:", error);
			return { error };
		}

		if (user) {
			const profileError = await addToProfiles(email, username, avatar, user.id);
			if (profileError) return { error: profileError };
		}
		return { success: true, session };
	};

	// Insert user data into profiles table
	const addToProfiles = async (
		email: string | null,
		username: string | null,
		avatar: string,
		id: string,
	) => {
		const { error: profileError } = await supabase
			.from('profiles')
			.insert([
				{
					id: id,
					username: username,
					email: email,
					avatar_url: avatar ? avatar : null,
				},
			]);

		if (profileError) {
			console.error("Error inserting profile:", profileError);
			return profileError;
		}
		return null;
	};

	// Convert an anonymous user to a permanent user
	const anonToPermanentUser = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();

		const { error: updateError } = await supabase.auth.updateUser({
			email,
			data: {
				email,
				username,
				avatar_url: getAvatarUrl(avatar),
			},
		});

		if (updateError) {
			console.error("Error converting user:", updateError);
			return { error: updateError };
		}

		await supabase.auth.updateUser({ password });

		if (session) {
			const { error: profileError } = await supabase
				.from('profiles')
				.update({
					username,
					email,
					avatar_url: getAvatarUrl(avatar),
				})
				.eq('id', session.user.id);

			if (profileError) {
				console.error("Error updating profile:", profileError);
				return { error: profileError };
			}
		}

		if (!session) {
			return { error: new Error("Please check your inbox for email verification!") };
		}
		return { success: true };
	};

	// Sign in anonymously
	const signInAnonymously = async () => {
		const { data: { user }, error } = await supabase.auth.signInAnonymously();

		if (error) {
			console.error("Anonymous sign-in error:", error);
			return { error };
		}

		if (user) {
			const profileError = await addToProfiles(
				null,
				null,
				getAvatarUrl("default"),
				user.id
			);
			if (profileError) return { error: profileError };
		}

		return { success: true };
	};

	// Sign out the current user
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Sign-out error:", error);
			return { error };
		}
		return { success: true };
	};

	const changeAvatar = async (avatar_url: string) => {
		if (!session?.user?.id) return { error: new Error("No user session") };

		const { error: updateUserError } = await supabase.auth.updateUser({ data: { avatar_url } });
		if (updateUserError) return { error: updateUserError };

		const { error: profileError } = await supabase
			.from('profiles')
			.update({ avatar_url })
			.eq('id', session.user.id);

		if (profileError) return { error: profileError };

		return { success: true };
	};

	return {
		signIn,
		signUp,
		signOut,
		signInAnonymously,
		session,
		getSession,
		anonToPermanentUser,
		changeAvatar,
	};
}

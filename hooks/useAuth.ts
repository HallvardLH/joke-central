import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import { Alert } from 'react-native';
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
			if (error instanceof Error) {
				console.error('Error fetching session:', error.message);
			}
		}
	}

	// Sign in with email and password
	const signIn = async (email: string, password: string) => {
		email = email.toLowerCase();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) Alert.alert(error.message);
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
			Alert.alert(error.message);
			return;
		}

		if (user) {
			await addToProfiles(email, username, avatar, user.id);
		}
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
			Alert.alert("Error saving user profile");
		} else {
			console.log("Profile inserted successfully!");
		}
	};

	// Convert an anonymous user to a permanent user
	const anonToPermanentUser = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();

		// Update user email, username, and avatar
		const { data, error } = await supabase.auth.updateUser({
			email,
			data: {
				email,
				username,
				avatar_url: getAvatarUrl(avatar),
			},
		});

		// Update password separately
		await supabase.auth.updateUser({ password });

		if (session) {
			// Update the profile in the profiles table
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
				Alert.alert("Error updating profile");
			}
		}

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert('Please check your inbox for email verification!');
	};

	// Sign in anonymously
	const signInAnonymously = async () => {
		const { data: { user }, error } = await supabase.auth.signInAnonymously();

		if (error) {
			Alert.alert(error.message);
			return;
		}

		if (user) {
			// Add an anonymous profile to the profiles table
			await addToProfiles(
				null,
				null, // No username for anonymous users initially
				getAvatarUrl("default"), // Default avatar
				user.id
			);
		}
	};

	// Sign out the current user
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) Alert.alert(error.message);
	};

	const changeAvatar = async (avatar_url: string) => {
		if (!session?.user?.id) return false;
		await supabase.auth.updateUser({ data: { avatar_url } });
		return await supabase.from('profiles').update({ avatar_url }).eq('id', session?.user.id);
	}

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

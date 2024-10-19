import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import { Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			},
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	function getAvatarUrl(avatar: number | string) {
		return `https//oprhztiruewgtiajcdmo.supabase.co/storage/v1/object/public/avatars/${avatar}.png`;
	}

	async function getSession() {
		if (session) return session;

		try {
			const { data: session, error } = await supabase.auth.getSession();
			if (error) throw error;
			setSession(session.session);
			return session.session;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching session', error.message);
			}
		}
	}

	const signIn = async (email: string, password: string) => {
		email = email.toLowerCase();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) Alert.alert(error.message);
	};

	const signUp = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();
		console.log(username);

		if (!avatar) avatar = 0;

		const {
			data: { user, session },
			error,
		} = await supabase.auth.signUp({
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
			addToProfiles(email, username, avatar, user.id);
		}
	};

	const addToProfiles = async (
		email: string | null,
		username: string | null,
		avatar: number | "default",
		id: string,
	) => {
		const { error: profileError } = await supabase
			.from('profiles')
			.insert([
				{
					id: id,
					username: username,
					email: email,
					avatar_url: avatar ? getAvatarUrl(avatar) : null,
				},
			]);

		if (profileError) {
			console.error("Error inserting profile:", profileError);
			Alert.alert("Error saving user profile");
		} else {
			console.log("Profile inserted successfully!");
		}
	};

	const anonToPermanentUser = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();
		const { data, error } = await supabase.auth.updateUser({
			email,
			data: {
				email,
				username,
				avatar_url: getAvatarUrl(avatar),
			},
		});

		await supabase.auth.updateUser({
			password,
		});
		if (session) {
			await supabase
				.from('profiles')
				.update({
					username,
					email,
					avatar_url: getAvatarUrl(avatar),
				})
				.eq('id', session.user.id);
		}

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert('Please check your inbox for email verification!');
	};

	const signInAnonymously = async () => {
		const { data: { user }, error } = await supabase.auth.signInAnonymously();

		if (error) {
			Alert.alert(error.message);
			return;
		}

		if (user) {
			// const defaultUsername = `guest_${user.id.substring(0, 8)}`;
			await addToProfiles(
				null,
				null,
				"default",
				user.id
			);
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) Alert.alert(error.message);
	};

	return {
		signIn,
		signUp,
		signOut,
		signInAnonymously,
		session,
		getSession,
		anonToPermanentUser,
	};
}

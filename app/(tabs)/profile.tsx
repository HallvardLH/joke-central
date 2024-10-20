import ScreenView from '@/components/ui/layout/ScreenView';
import SignUp from '@/components/gameComponents/auth/SignUp';
import ProfileTop from '@/components/gameComponents/profile/ProfileTop';
import JokeBrowse from '@/components/gameComponents/browse/JokeBrowse';
import { View } from 'tamagui';
import { ScrollView } from 'react-native';

export default function Profile() {
    return (
        <ScreenView>
            <ScrollView style={{ width: "100%", flex: 1, }}>
                <ProfileTop
                    username="Hallvard"
                    avatarUrl="https://oprhztiruewgtiajcdmo.supabase.co/storage/v1/object/public/avatars/2.png"
                    reads={2351}
                    likes={2223233}
                    jokesAmount={999}
                />
                <JokeBrowse />
            </ScrollView>

        </ScreenView>
    );
}

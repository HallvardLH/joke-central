import { supabase } from "@/supabase";
import { useState, useEffect } from "react";

export const useSettings = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [interstitialAdFeedFrequency, setInterstitialAdFeedFrequency] = useState<number | undefined>(undefined);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("settings")
            .select("*")
            .single();

        if (error) {
            console.error("Error fetching settings:", error);
            setInterstitialAdFeedFrequency(15); // Fallback if fetch fails
        } else if (data?.interstitial_feed_frequency) {
            setInterstitialAdFeedFrequency(data.interstitial_feed_frequency);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return { interstitialAdFeedFrequency, loading };
};


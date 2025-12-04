import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface WaveTimerProps {
    duration: number; // in seconds
    onComplete?: () => void;
}

export const WaveTimer: React.FC<WaveTimerProps> = ({ duration, onComplete }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        if (onComplete) {
                            onComplete();
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeRemaining, onComplete]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        if (timeRemaining === 0) {
            setTimeRemaining(duration);
        }
        setIsRunning(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeRemaining(duration);
    };

    return (
        <View className="items-center mb-4 mt-4">
            <View className='w-20 h-20 rounded-full justify-center items-center mb-4' style={{ backgroundColor: colors.orange_100 }}>
                <Text style={[t.textBold, { color: colors.Text_Primary }]}>
                    {formatTime(timeRemaining)}
                </Text>
            </View>
           
            <Pressable
                className="rounded-full py-4 px-8"
                style={{ backgroundColor: colors.Button_Orange }}
                onPress={isRunning ? handleReset : handleStart}
            >
                <Text style={[t.button, { color: colors.white }]}>
                    {isRunning ? 'Reset Timer' : 'Start Wave Timer'}
                </Text>
            </Pressable>
        </View>
    );
};


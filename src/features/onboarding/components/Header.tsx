import React from 'react';
import {
    Pressable,
    View,
    Image,
    Text
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { images } from '@design/image';
import { t } from '@design/typography';
import { colors } from '@design/color';
import ArrowLeftIcon from '@assets/icons/previous.svg';


type Props = {
    text?: string
    icon?: boolean
    back?: boolean
}
export const Header: React.FC<Props> = ({ text, icon, back = true }) => {
    const { dissolveGoBack } = useDissolveNavigation();

    return (
        <View className="flex-row items-center justify-between mb-2 mt-6">
            {back && <Pressable onPress={dissolveGoBack} hitSlop={12} className="w-[48px] h-[48px] justify-center items-center" >
                <ArrowLeftIcon width={28} height={28} fill={colors.white} />
            </Pressable>
            }
            {text &&
                <View className='flex-1 text-center min-h-[48px] items-center justify-center'>
                    <Text style={[t.title16SemiBold, { color: colors.text_primary }]}
                        className='text-center'> {text}
                    </Text>
                </View>}

            {
                icon &&
                <View className='w-9 h-9 justify-center items-center'>
                    <Image source={images.leaf} className="w-[15px] h-[24px]" resizeMode="contain" />
                </View>
            }
        </View>
    );
}

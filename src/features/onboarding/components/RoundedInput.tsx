import { colors } from '@design/color';
import { t } from '@design/typography';
import {
    TextInput,
    View,
} from 'react-native';

type RoundedInputProps = React.ComponentProps<typeof TextInput> & {
    rightAdornment?: React.ReactNode;
};

function RoundedInputTW({ rightAdornment, className, ...props }: RoundedInputProps) {
    return (
        <View className="relative border border-neutral-200 bg-white rounded-full px-4 py-2 mb-4">
            <TextInput
                {...props}
                placeholderTextColor={colors.text_secondary}
                className={['text-[16px] text-neutral-900  text-center', className || ''].join(' ')}
                style={[t.textRegular, { color: colors.text_primary }]}
            />
            {rightAdornment ? (
                <View className="absolute right-3 inset-y-0 justify-center">{rightAdornment}</View>
            ) : null}
        </View>
    );
}

export default RoundedInputTW
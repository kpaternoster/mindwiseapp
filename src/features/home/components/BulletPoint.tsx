import { colors } from '@design/color';
import { t } from '@design/typography';
import {
    View,
    Text
} from 'react-native';

export const BulletPoint: React.FC<{ text: string; isLast?: boolean }> = ({ text, isLast }) => (
    <View className={`flex-row items-start ${!isLast ? 'mb-2' : ''}`}>
        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">•</Text>
        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
            {text}
        </Text>
    </View>
);
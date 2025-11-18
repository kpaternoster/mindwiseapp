import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';

interface PolicySection {
    id: string;
    title: string;
    content: string;
    items: string[];
}

interface PrivacyPolicyData {
    title: string;
    subtitle: string;
    buttonText: string;
    sections: PolicySection[];
    securityNote: {
        title: string;
        description: string;
    };
}

interface PrivacyPolicyProps {
    policyData: PrivacyPolicyData;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
    policyData,
}) => {
    const [viewFullPolicy, setViewFullPolicy] = useState(false);

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });


    return (
        <View className="p-4 mb-6 mx-6 border border-gray-200 rounded-2xl">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                {policyData.title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                {policyData.subtitle}
            </Text>
            <View className='h-[1px] bg-gray-200 mb-4'></View>
            <Pressable
                onPress={() => setViewFullPolicy(!viewFullPolicy)}
                className="flex-row items-center justify-between py-4 px-4 rounded-full mb-4"
                style={{ backgroundColor: colors.orange_500 }}
            >
                <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                    {policyData.buttonText}
                </Text>
                <View className="w-9 h-9 items-center justify-center rounded-full" style={{ backgroundColor: colors.white }}>
                    <ArrowRightIcon size={16} color={colors.warm_dark} />
                </View>
            </Pressable>

             {/* Privacy Policy Preview */}
             {viewFullPolicy && (
                 <View className="rounded-xl p-4 mb-4" style={{ backgroundColor: colors.orange_50 }}>
                     <ScrollView
                         style={{ maxHeight: 300 }}
                         showsVerticalScrollIndicator={true}
                         nestedScrollEnabled={true}
                     >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            MindWise DBT Privacy Policy
                        </Text>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-6">
                            Last updated: {currentDate}
                        </Text>
                        {policyData.sections.map((section) => (
                            <View key={section.id} className="mb-4">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {section.title}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-2">
                                    {section.content}
                                </Text>
                                {section.items.map((item, index) => (
                                    <Text
                                        key={index}
                                        style={[t.textRegular, { color: colors.Text_Primary }]}
                                        className="mb-1"
                                    >
                                        • {item}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

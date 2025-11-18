import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, CaretRightIcon } from '@components/Utils';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../../components';
import dbtOverviewData from '../../data/pretreatment/dbtOverview.json';

interface SectionItem {
    id: number;
    title: string;
    description: string;
}

const SECTIONS_DATA: SectionItem[] = dbtOverviewData.sections;

export default function DBTOverviewScreen() {
    const { dissolveTo, dissolveGoBack } = useDissolveNavigation();

    const handleSectionPress = (sectionId: number) => {
        switch (sectionId) {
            case 1:
                dissolveTo('UnderstandYourself');
                break;
            case 2:
                dissolveTo('UnderstandEmotions');
                break;
            case 3:
                dissolveTo('AboutDBT');
                break;
            case 4:
                dissolveTo('DBTSkills');
                break;
            case 5:
                dissolveTo('DBTJourney');
                break;
            default:
                console.log('Unknown section:', sectionId);
                break;
        }
    };

    const handleNextPress = () => {
        dissolveTo('TreatmentAssessment');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <View className="mb-8">
                <PageHeader title="DBT Overview" />
            </View>

            {/* Main Content Card */}
            <View className="flex-1 bg-white mx-4 mb-4">
                <ScrollView
                    className="flex-1 px-5 pt-6 pb-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Sections List */}
                    {SECTIONS_DATA.map((section) => (
                        <Pressable
                            key={section.id}
                            className="bg-white mb-3 p-4 rounded-2xl border"
                            style={{ borderColor: colors.gray_300 }}
                            onPress={() => handleSectionPress(section.id)}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1 mr-3">
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className='mb-2'>
                                        {section.title}
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {section.description}
                                    </Text>
                                </View>
                                <View className="w-6 h-6 items-center justify-center">
                                    <CaretRightIcon size={16} color={colors.text_secondary} />
                                </View>
                            </View>
                        </Pressable>
                    ))}

                    {/* Bottom Button */}

                </ScrollView>
            </View>
            <View className="mt-4 mb-8 p-4">
                <Pressable
                    className="rounded-full py-4 px-6 flex-row justify-center items-center"
                    style={{ backgroundColor: colors.button_orange }}
                    onPress={handleNextPress}
                >
                    <Text style={[t.title16SemiBold, { color: colors.white }]} className='flex-1 text-center'>
                        Next: Treatment Target
                    </Text>
                    <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                        <ArrowRightIcon size={16} color={colors.warm_dark} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
});


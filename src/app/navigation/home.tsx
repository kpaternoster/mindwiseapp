import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from './types';
import Home from '@features/home/screens/index';
import Plan from '@features/plan/screens/index';
import Learn from '@features/learn/screens/index';
import Act from '@features/act/screens/index';
import Account from '@features/account/screens/index';
import Help from '@features/help/screens/index';

import CreateDiaryCardScreen from '@features/plan/screens/CreateDiaryCard';
import AboutDiaryCardScreen from '@features/plan/screens/AboutDiaryCard';
import HelpReasonScreen from '@features/help/screens/Reason';
import TutorialIntroScreen from '@features/tutorial/screens/TutorialIntro';
import TutorialScreen from '@features/tutorial/screens/Tutorial';
import { NotificationsScreen } from '@features/notifications/screens/index';
import PreTreatmentScreen from '@features/home/screens/pretreatment/PreTreatment';
import DBTOverviewScreen from '@features/home/screens/pretreatment/DBTOverview';
import UnderstandYourselfScreen from '@features/home/screens/pretreatment/UnderstandYourself';
import UnderstandEmotionsScreen from '@features/home/screens/pretreatment/UnderstandEmotions';
import AboutDBTScreen from '@features/home/screens/pretreatment/AboutDBT';
import DBTSkillsScreen from '@features/home/screens/pretreatment/DBTSkills';
import DBTJourneyScreen from '@features/home/screens/pretreatment/DBTJourney';
import TreatmentAssessmentScreen from '@features/home/screens/pretreatment/TreatmentAssessment';
import StrengthsResourcesScreen from '@features/home/screens/pretreatment/StrengthsResources';
import BuildingCommitmentScreen from '@features/home/screens/pretreatment/BuildingCommitment';
import LetterFromFutureSelfScreen from '@features/home/screens/pretreatment/LetterFromFutureSelf';
import SignYourCommitmentsScreen from '@features/home/screens/pretreatment/SignYourCommitments';
import TreatmentPlanScreen from '@features/home/screens/pretreatment/TreatmentPlan';
import DailyCheckInScreen from '@features/home/screens/dailycheckin/DailyCheckIn';
import TodayCheckInScreen from '@features/home/screens/dailycheckin/TodayCheckIn';
import WeeklyReviewScreen from '@features/home/screens/dailycheckin/WeeklyReview';
import ProgressTrackingScreen from '@features/home/screens/dailycheckin/ProgressTracking';
import Favorites from '@features/account/screens/Favorites';
import Contacts from '@features/account/screens/Contacts';
import Privacy from '@features/account/screens/Privacy';
import Settings from '@features/account/screens/Settings';
import HelpSupport from '@features/account/screens/HelpSupport';


const Stack = createNativeStackNavigator<HomeStackParams>();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="TutorialIntro" component={TutorialIntroScreen} />
            <Stack.Screen name="Tutorial" component={TutorialScreen} />

            <Stack.Screen name="Plan" component={Plan} />
            <Stack.Screen name='Plan_Diary' component={CreateDiaryCardScreen} />
            <Stack.Screen name='Plan_DiaryCard_Help' component={AboutDiaryCardScreen} />

            {/* Pre-Treatment Module */}
            <Stack.Screen name="PreTreatment" component={PreTreatmentScreen} />
            <Stack.Screen name="DBTOverview" component={DBTOverviewScreen} />
            <Stack.Screen name="UnderstandYourself" component={UnderstandYourselfScreen} />
            <Stack.Screen name="UnderstandEmotions" component={UnderstandEmotionsScreen} />
            <Stack.Screen name="AboutDBT" component={AboutDBTScreen} />
            <Stack.Screen name="DBTSkills" component={DBTSkillsScreen} />
            <Stack.Screen name="DBTJourney" component={DBTJourneyScreen} />
            <Stack.Screen name="TreatmentAssessment" component={TreatmentAssessmentScreen} />
            <Stack.Screen name="StrengthsResources" component={StrengthsResourcesScreen} />
            <Stack.Screen name="BuildingCommitment" component={BuildingCommitmentScreen} />
            <Stack.Screen name="LetterFromFutureSelf" component={LetterFromFutureSelfScreen} />
            <Stack.Screen name="SignYourCommitments" component={SignYourCommitmentsScreen} />
            <Stack.Screen name="TreatmentPlan" component={TreatmentPlanScreen} />

            {/* Daily Check-In Module */}
            <Stack.Screen name="DailyCheckIn" component={DailyCheckInScreen} />
            <Stack.Screen name="TodayCheckIn" component={TodayCheckInScreen} />
            <Stack.Screen name="WeeklyReview" component={WeeklyReviewScreen} />
            <Stack.Screen name="ProgressTracking" component={ProgressTrackingScreen} />

            {/** Account Module */}
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Account_Favorites" component={Favorites} />
            <Stack.Screen name="Account_Contacts" component={Contacts} />
            <Stack.Screen name="Account_Privacy" component={Privacy} />
            <Stack.Screen name="Account_Settings" component={Settings} />
            <Stack.Screen name="Account_Help" component={HelpSupport} />

            
            <Stack.Screen name="Learn" component={Learn} />
            <Stack.Screen name="Act" component={Act} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Help_Reason" component={HelpReasonScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from './types';
import Home from '@features/home/screens/index';
import Plan from '@features/plan/screens/index';
import Learn from '@features/learn/screens/index';
import UnderstandEmotionsLearnScreen from '@features/learn/screens/UnderstandEmotions';
import RegulateEmotionsScreen from '@features/learn/screens/RegulateEmotions';
import EmotionsWheelScreen from '@features/learn/screens/EmotionsWheel';
import EmotionsWheelExercisesScreen from '@features/learn/screens/EmotionsWheelExercises';
import NameYourEmotionsScreen from '@features/learn/screens/NameYourEmotions';
import EmotionsTrackerScreen from '@features/learn/screens/EmotionsTracker';
import PracticeWithOthersScreen from '@features/learn/screens/PracticeWithOthers';
import AboutSUDSScreen from '@features/learn/screens/AboutSUDS';
import SUDSExercisesScreen from '@features/learn/screens/SUDSExercises';
import SUDSCheckInScreen from '@features/learn/screens/SUDSCheckIn';
import SUDSCopingPlanScreen from '@features/learn/screens/SUDSCopingPlan';
import AboutSTUNWAVEScreen from '@features/learn/screens/AboutSTUNWAVE';
import STUNWAVEExercisesScreen from '@features/learn/screens/STUNWAVEExercises';
import STUNWAVECheckInScreen from '@features/learn/screens/STUNWAVECheckIn';
import STUNWAVEEntriesScreen from '@features/learn/screens/STUNWAVEEntries';
import CheckTheFactsScreen from '@features/learn/screens/CheckTheFacts';
import CheckTheFactsExercisesScreen from '@features/learn/screens/CheckTheFactsExercises';
import CheckTheFactsFindingScreen from '@features/learn/screens/CheckTheFactsFinding';
import CheckTheFactsEntriesScreen from '@features/learn/screens/CheckTheFactsEntries';
import ChainAnalysisScreen from '@features/learn/screens/ChainAnalysis';
import ChainAnalysisExercisesScreen from '@features/learn/screens/ChainAnalysisExercises';
import Act from '@features/act/screens/index';
import Account from '@features/account/screens/index';
import Help from '@features/help/screens/index';

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
            <Stack.Screen name="Learn_UnderstandEmotions" component={UnderstandEmotionsLearnScreen} />
            <Stack.Screen name="Learn_RegulateEmotions" component={RegulateEmotionsScreen} />
            <Stack.Screen name="Learn_EmotionsWheel" component={EmotionsWheelScreen} />
            <Stack.Screen name="Learn_EmotionsWheelExercises" component={EmotionsWheelExercisesScreen} />
            <Stack.Screen name="Learn_NameYourEmotions" component={NameYourEmotionsScreen} />
            <Stack.Screen name="Learn_EmotionsTracker" component={EmotionsTrackerScreen} />
            <Stack.Screen name="Learn_PracticeWithOthers" component={PracticeWithOthersScreen} />
            <Stack.Screen name="Learn_AboutSUDS" component={AboutSUDSScreen} />
            <Stack.Screen name="Learn_SUDSExercises" component={SUDSExercisesScreen} />
            <Stack.Screen name="Learn_SUDSCheckIn" component={SUDSCheckInScreen} />
            <Stack.Screen name="Learn_SUDSCopingPlan" component={SUDSCopingPlanScreen} />
            <Stack.Screen name="Learn_AboutSTUNWAVE" component={AboutSTUNWAVEScreen} />
            <Stack.Screen name="Learn_STUNWAVEExercises" component={STUNWAVEExercisesScreen} />
            <Stack.Screen name="Learn_STUNWAVECheckIn" component={STUNWAVECheckInScreen} />
            <Stack.Screen name="Learn_STUNWAVEEntries" component={STUNWAVEEntriesScreen} />
            <Stack.Screen name="Learn_CheckTheFacts" component={CheckTheFactsScreen} />
            <Stack.Screen name="Learn_CheckTheFactsExercises" component={CheckTheFactsExercisesScreen} />
            <Stack.Screen name="Learn_CheckTheFactsFinding" component={CheckTheFactsFindingScreen} />
            <Stack.Screen name="Learn_CheckTheFactsEntries" component={CheckTheFactsEntriesScreen} />
            <Stack.Screen name="Learn_ChainAnalysis" component={ChainAnalysisScreen} />
            <Stack.Screen name="Learn_ChainAnalysisExercises" component={ChainAnalysisExercisesScreen} />
            <Stack.Screen name="Act" component={Act} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Help_Reason" component={HelpReasonScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    );
}

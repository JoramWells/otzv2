/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit'
import { curriculumCategoryApi } from '../api/school/curriculumCategory.api'
import { disclosureChecklistApi } from '../api/treatmentplan/disclosureChecklist.api'
import { appointmentStatusApi } from '../api/appointment/appointmentStatus.api'
import { appointmentAgendaApi } from '../api/appointment/appointmentAgenda.api'
import { otzEnrollmentApi } from '../api/enrollment/otzEnrollment.api'
import { caregiverApi } from '../api/caregiver/caregiver.api'
import { patientsApi } from '../api/patient/patients.api'
import { vitalSignsApi } from '../api/vitalsigns/vitalSigns.api'
import { artRegimenApi } from '../api/art/artRegimen.api.'
import { artRegimenPhaseApi } from '../api/art/artRegimenPhase.api'
import { artRegimenCategoryApi } from '../api/art/artRegimenCategory.api'
import { userApi } from '../api/users/users.api'
import { homeVisitReasonApi } from '../api/homevisit/homeVisitReason.api'
import { homeVisitFrequencyApi } from '../api/homevisit/homeVisitFrequency.api'
import { homeVisitApi } from '../api/homevisit/homeVisit.api'
import { timeAndWorkApi } from '../api/treatmentplan/timeAndWork.api'
import { mmasApi } from '../api/treatmentplan/mmas.api'
import { appointmentApi } from '../api/appointment/appointment.api.'
import { curriculumSubCategoryApi } from '../api/school/curriculumSubCategory.api'
import { schoolClassesApi } from '../api/school/schoolClasses.api'
import { schoolTermApi } from '../api/school/schoolTerm.api'
import { schoolTermHolidayApi } from '../api/school/schoolTermHoliday.api'
import { occupationApi } from '@/api/occupation.api'
import { countyApi } from '@/api/location/county.api'
import { subCountyApi } from '@/api/location/subCounty.api'
import { wardApi } from '@/api/location/ward.api'
import { schoolApi } from '@/api/school/school.api'
import { viralLoadApi } from '@/api/enrollment/viralLoadTests.api'
import { artSwitchReasonApi } from '@/api/art/artSwitchReason.api'
import { artRegimenSwitchApi } from '@/api/art/artRegimenSwitch.api'
import { internalLabRequestApi } from '@/api/viraload/internalLabRequest.api'
import { measuringUnitApi } from '@/api/art/measuringUnit.api'
import { smsApi } from '@/api/sms/sms.api'
import { pillDailyUptakeApi } from '@/api/treatmentplan/uptake.api'
import { notificationTypeApi } from '@/api/notifications/notificationTypes.api'
import { notificationCategoryApi } from '@/api/notifications/notificationCategory.api'
import { notificationSubCategoryApi } from '@/api/notifications/notificationSubCategory.api'
import { notificationApi } from '@/api/notifications/notification.api'
import { userNotificationApi } from '@/api/notifications/userNotification.api'
import { chatApi } from '@/api/notifications/chat.api'
import { chatMessageApi } from '@/api/notifications/chatMessage.api'
import { caseManagerApi } from '@/api/caregiver/casemanager.api'
import { prescriptionApi } from '@/api/pillbox/prescription.api'
import { patientNotificationApi } from '@/api/notifications/patientNotification.api'
import { messageTextReplyApi } from '@/api/notifications/messageTextReplies.api'
import { articlesCategoryApi } from '@/api/articles/articlesCategory.api'
import { articlesApi } from '@/api/articles/articles.api'
import { nextOfKinApi } from '@/api/patient/nextOfKin.api'
import { patientVisitsApi } from '@/api/patient/patientVisits.api'
import { artPrescriptionApi } from '@/api/art/artPrescription.api'
import { pamaEnrollmentApi } from '@/api/enrollment/pamaEnrollment.api'
import { patientAllergyApi } from '@/api/medicalfile/patientAllergy.api'
import { pmtctProfileEnrollmentApi } from '@/api/enrollment/pmtctProfileEnrollment.api'
import { chaptersApi } from '@/api/articles/chapters.api'
import { mmasFourApi } from '@/api/treatmentplan/mmasFour.api'
import { mmasEightApi } from '@/api/treatmentplan/mmasEight.api'
import { partialDisclosureApi } from '@/api/treatmentplan/partial/partialDisclosure.api'
import { childCaregiverReadinessApi } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { disclosureEligibilityApi } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { questionsApi } from '../api/articles/questions.api'
import { userAvailabilityApi } from '@/api/users/userAvailability.api'
import { etlApi } from '@/api/etl/etl.api'
import { facilityMAPApi } from '@/api/etl/facilityMAP.api'
import { userLocationApi } from '@/api/location/userLocation.api'
import { homeVisitConfigApi } from '@/api/homevisit/homeVisitConfig.api'
import { eventTypeApi } from '@/api/appointment/events/eventType'
import { attendeeApi } from '@/api/appointment/events/attendees'
import { hospitalApi } from '@/api/hospital/hospital.api'
import { enhancedAdherenceApi } from '@/api/treatmentplan/enhancedAdherence.api'
import { patientSessionLogsApi } from '@/api/patient/patientSessionLogs.api'
import { executeDisclosureApi } from '@/api/treatmentplan/full/executeDisclosure.api'
import { postDisclosureApi } from '@/api/treatmentplan/full/postDisclosure.api'
import { importantPatientApi } from '@/api/patient/importantPatients.api'
import { userSessionLogsApi } from '@/api/patient/userSessionLogs.api'
import { appModulesApi } from '@/api/appModules/appModules.api'

export const store = configureStore({
  reducer: {
    [patientsApi.reducerPath]: patientsApi.reducer,
    [nextOfKinApi.reducerPath]: nextOfKinApi.reducer,
    [enhancedAdherenceApi.reducerPath]: enhancedAdherenceApi.reducer,
    [patientVisitsApi.reducerPath]: patientVisitsApi.reducer,
    [vitalSignsApi.reducerPath]: vitalSignsApi.reducer,
    [artRegimenApi.reducerPath]: artRegimenApi.reducer,
    [appModulesApi.reducerPath]: appModulesApi.reducer,
    [artRegimenPhaseApi.reducerPath]: artRegimenPhaseApi.reducer,
    [artRegimenCategoryApi.reducerPath]: artRegimenCategoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [homeVisitReasonApi.reducerPath]: homeVisitReasonApi.reducer,
    [homeVisitFrequencyApi.reducerPath]: homeVisitFrequencyApi.reducer,
    [homeVisitApi.reducerPath]: homeVisitApi.reducer,
    [timeAndWorkApi.reducerPath]: timeAndWorkApi.reducer,
    [mmasApi.reducerPath]: mmasApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [disclosureChecklistApi.reducerPath]: disclosureChecklistApi.reducer,
    [appointmentStatusApi.reducerPath]: appointmentStatusApi.reducer,
    [appointmentAgendaApi.reducerPath]: appointmentAgendaApi.reducer,
    [otzEnrollmentApi.reducerPath]: otzEnrollmentApi.reducer,
    [caregiverApi.reducerPath]: caregiverApi.reducer,
    [curriculumCategoryApi.reducerPath]: curriculumCategoryApi.reducer,
    [curriculumSubCategoryApi.reducerPath]: curriculumSubCategoryApi.reducer,
    [schoolClassesApi.reducerPath]: schoolClassesApi.reducer,
    [schoolTermApi.reducerPath]: schoolTermApi.reducer,
    [schoolTermHolidayApi.reducerPath]: schoolTermHolidayApi.reducer,
    [occupationApi.reducerPath]: occupationApi.reducer,
    [countyApi.reducerPath]: countyApi.reducer,
    [subCountyApi.reducerPath]: subCountyApi.reducer,
    [wardApi.reducerPath]: wardApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
    [viralLoadApi.reducerPath]: viralLoadApi.reducer,
    [artSwitchReasonApi.reducerPath]: artSwitchReasonApi.reducer,
    [artRegimenSwitchApi.reducerPath]: artRegimenSwitchApi.reducer,
    [internalLabRequestApi.reducerPath]: internalLabRequestApi.reducer,
    [measuringUnitApi.reducerPath]: measuringUnitApi.reducer,
    [smsApi.reducerPath]: smsApi.reducer,
    [pillDailyUptakeApi.reducerPath]: pillDailyUptakeApi.reducer,
    [notificationTypeApi.reducerPath]: notificationTypeApi.reducer,
    [notificationCategoryApi.reducerPath]: notificationCategoryApi.reducer,
    [notificationSubCategoryApi.reducerPath]:
      notificationSubCategoryApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [userNotificationApi.reducerPath]: userNotificationApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [chatMessageApi.reducerPath]: chatMessageApi.reducer,
    [caseManagerApi.reducerPath]: caseManagerApi.reducer,
    [prescriptionApi.reducerPath]: prescriptionApi.reducer,
    [patientSessionLogsApi.reducerPath]: patientSessionLogsApi.reducer,
    [patientNotificationApi.reducerPath]: patientNotificationApi.reducer,
    [messageTextReplyApi.reducerPath]: messageTextReplyApi.reducer,
    [articlesCategoryApi.reducerPath]: articlesCategoryApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [pamaEnrollmentApi.reducerPath]: pamaEnrollmentApi.reducer,
    [patientAllergyApi.reducerPath]: patientAllergyApi.reducer,
    [pmtctProfileEnrollmentApi.reducerPath]: pmtctProfileEnrollmentApi.reducer,
    [artPrescriptionApi.reducerPath]: artPrescriptionApi.reducer,
    [mmasFourApi.reducerPath]: mmasFourApi.reducer,
    [mmasEightApi.reducerPath]: mmasEightApi.reducer,
    [childCaregiverReadinessApi.reducerPath]:
      childCaregiverReadinessApi.reducer,
    [partialDisclosureApi.reducerPath]: partialDisclosureApi.reducer,
    [disclosureEligibilityApi.reducerPath]: disclosureEligibilityApi.reducer,
    [chaptersApi.reducerPath]: chaptersApi.reducer,
    [userAvailabilityApi.reducerPath]: userAvailabilityApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [facilityMAPApi.reducerPath]: facilityMAPApi.reducer,
    [etlApi.reducerPath]: etlApi.reducer,
    [userLocationApi.reducerPath]: userLocationApi.reducer,
    [homeVisitConfigApi.reducerPath]: homeVisitConfigApi.reducer,
    [eventTypeApi.reducerPath]: eventTypeApi.reducer,
    [attendeeApi.reducerPath]: attendeeApi.reducer,
    [executeDisclosureApi.reducerPath]: executeDisclosureApi.reducer,
    [postDisclosureApi.reducerPath]: postDisclosureApi.reducer,
    [importantPatientApi.reducerPath]: importantPatientApi.reducer,
    [userSessionLogsApi.reducerPath]: userSessionLogsApi.reducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(patientsApi.middleware)
      .concat(nextOfKinApi.middleware)
      .concat(patientVisitsApi.middleware)
      .concat(vitalSignsApi.middleware)
      .concat(artRegimenApi.middleware)
      .concat(artRegimenPhaseApi.middleware)
      .concat(artRegimenCategoryApi.middleware)
      .concat(userApi.middleware)
      .concat(homeVisitReasonApi.middleware)
      .concat(homeVisitFrequencyApi.middleware)
      .concat(homeVisitApi.middleware)
      .concat(timeAndWorkApi.middleware)
      .concat(mmasApi.middleware)
      .concat(appointmentApi.middleware)
      .concat(disclosureChecklistApi.middleware)
      .concat(appointmentStatusApi.middleware)
      .concat(appointmentAgendaApi.middleware)
      .concat(otzEnrollmentApi.middleware)
      .concat(caregiverApi.middleware)
      .concat(curriculumCategoryApi.middleware)
      .concat(curriculumSubCategoryApi.middleware)
      .concat(schoolClassesApi.middleware)
      .concat(schoolTermApi.middleware)
      .concat(schoolTermHolidayApi.middleware)
      .concat(occupationApi.middleware)
      .concat(countyApi.middleware)
      .concat(subCountyApi.middleware)
      .concat(wardApi.middleware)
      .concat(schoolApi.middleware)
      .concat(viralLoadApi.middleware)
      .concat(artSwitchReasonApi.middleware)
      .concat(appModulesApi.middleware)
      .concat(artRegimenSwitchApi.middleware)
      .concat(internalLabRequestApi.middleware)
      .concat(measuringUnitApi.middleware)
      .concat(smsApi.middleware)
      .concat(pillDailyUptakeApi.middleware)
      .concat(notificationTypeApi.middleware)
      .concat(notificationCategoryApi.middleware)
      .concat(notificationSubCategoryApi.middleware)
      .concat(notificationApi.middleware)
      .concat(chatApi.middleware)
      .concat(userNotificationApi.middleware)
      .concat(chatMessageApi.middleware)
      .concat(caseManagerApi.middleware)
      .concat(prescriptionApi.middleware)
      .concat(messageTextReplyApi.middleware)
      .concat(patientNotificationApi.middleware)
      .concat(articlesApi.middleware)
      .concat(articlesCategoryApi.middleware)
      .concat(artPrescriptionApi.middleware)
      .concat(patientAllergyApi.middleware)
      .concat(pmtctProfileEnrollmentApi.middleware)
      .concat(chaptersApi.middleware)
      .concat(mmasFourApi.middleware)
      .concat(mmasEightApi.middleware)
      .concat(partialDisclosureApi.middleware)
      .concat(disclosureEligibilityApi.middleware)
      .concat(childCaregiverReadinessApi.middleware)
      .concat(pamaEnrollmentApi.middleware)
      .concat(userAvailabilityApi.middleware)
      .concat(etlApi.middleware)
      .concat(facilityMAPApi.middleware)
      .concat(userLocationApi.middleware)
      .concat(homeVisitConfigApi.middleware)
      .concat(questionsApi.middleware)
      .concat(eventTypeApi.middleware)
      .concat(patientSessionLogsApi.middleware)
      .concat(attendeeApi.middleware)
      .concat(enhancedAdherenceApi.middleware)
      .concat(executeDisclosureApi.middleware)
      .concat(postDisclosureApi.middleware)
      .concat(importantPatientApi.middleware)
      .concat(userSessionLogsApi.middleware)
      .concat(hospitalApi.middleware),
});

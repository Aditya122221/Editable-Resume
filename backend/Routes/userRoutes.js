import express from "express"
const router = express.Router()

import SignupController from "../Controllers/SignupController.js"
import LoginController from "../Controllers/LoginController.js"
import ForgotPasswordController from "../Controllers/ForgotPasswordController.js"
import ResetPasswordController from "../Controllers/ResetPasswordController.js"
import FetchController from '../Controllers/FetchController.js'
import ProfileController from "../Controllers/ProfileController.js"
import ProjectController from "../Controllers/ProjectController.js"
import CertificateController from "../Controllers/CertificateController.js"
import SkillController from "../Controllers/SkillController.js"
import EducationController from '../Controllers/EducationController.js'
import InternshipController from "../Controllers/InternshipController.js"
import TempController from "../Controllers/TempController.js"
import AchievementsController from "../Controllers/AchievementsController.js"
import { submitContactForm, getContactMessages, updateMessageStatus } from "../Controllers/ContactController.js"

router.post('/signup', SignupController)
router.post('/login', LoginController)
router.post('/forgot-password', ForgotPasswordController)
router.post('/reset-password', ResetPasswordController)
router.post('/fetchalldata', FetchController)
router.post('/profile', ProfileController)
router.post('/project', ProjectController)
router.post('/certificate', CertificateController)
router.post('/skill', SkillController)
router.post('/education', EducationController)
router.post('/internship', InternshipController)
router.post('/achievement', AchievementsController)

// Contact form routes
router.post('/api/contact', submitContactForm)
router.get('/api/contact', getContactMessages)
router.put('/api/contact/:id', updateMessageStatus)

router.post('/admin', TempController)

export default router
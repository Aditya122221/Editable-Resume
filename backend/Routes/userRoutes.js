import express from "express"
const router = express.Router()

import SignupController from "../Controllers/SignupController.js"
import LoginController from "../Controllers/LoginController.js"
import FetchController from '../Controllers/FetchController.js'
import ProfileController from "../Controllers/ProfileController.js"
import ProjectController from "../Controllers/ProjectController.js"
import CertificateController from "../Controllers/CertificateController.js"
import SkillController from "../Controllers/SkillController.js"
import EducationController from '../Controllers/EducationController.js'
import InternshipController from "../Controllers/InternshipController.js"

router.post('/signup', SignupController)
router.post('/login', LoginController)
router.post('/fetchalldata', FetchController)
router.post('/profile', ProfileController)
router.post('/project', ProjectController)
router.post('/certificate', CertificateController)
router.post('/skill', SkillController)
router.post('/education', EducationController)
router.post('/internship', InternshipController)

export default router
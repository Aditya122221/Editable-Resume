import Project from "../Models/ProjectModel.js";

const ProjectController = async (req, res) => {
    try {
        const { Registration_ID, Project_ID, Name, technologies, startDate, endDate, description, githubLink, flag } = req.body;

        if (flag === 1) {
            const project = await Project.find({ Registration_ID })

            return res.status(200).json({ project: project })
        } else if (flag === 2) {
            const project = await Project.updateOne(
                { Project_ID },
                {
                    $set: { name: Name, technologies, startDate, endDate, description, githubLink }
                }
            )

            if (project.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Project Updated" })
        } else if (flag === 3) {
            const project = await Project.deleteOne({ Project_ID })

            if (project.deletedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Deleting Error from server side. Please try again later" })
            }

            return res.status(200).json({ message: "Project Deleted" })
        } else if(flag === 4) {
            let p_id;
            let isDuplicate = true
            while (isDuplicate) {
                p_id = "PJ" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Project.findOne({ Project_ID: p_id })
            }

            const newProject = new Project(
                {
                    Registration_ID, Project_ID: p_id, name: Name, technologies, startDate, endDate, description, githubLink
                }
            )

            await newProject.save()

            return res
            .status(201)
            .json({ status: true, message: "Project Added" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default ProjectController
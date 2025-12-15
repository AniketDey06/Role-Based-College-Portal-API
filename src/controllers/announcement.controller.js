import { createNewAnnouncement, getAllAnnouncement } from "../service/announcement.service.js";
import { createAnnouncementPostRequstBodySchema } from "../validations/request.validation.js"


export const createAnnouncement = async (req, res) => {
    const validationResult = await createAnnouncementPostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { title, description } = validationResult.data
    const userId = req.user.id

    const announcement = await createNewAnnouncement({title, description, userId})

    return res.status(201).json({data: { ...announcement}})
}

export const getAnnouncement = async (req, res) => {
    const announcements = await getAllAnnouncement()
    
    return res.status(200).json({data: { ...announcements}})
}
import { Request, Response } from "express";
import { Op } from "sequelize";
import Event from "../models/Events";
import UserEvent from "../models/user_events";

interface GetEventsProps {
  page?: number;
  perPage?: number;
  userId?: string;
}

const getEvents = async ({ page = 1, perPage = 10, userId }: GetEventsProps = {}) => {
  const offset = (+page - 1) * (+perPage);

  const events = await Event.findAll({
    limit: Number(perPage),
    offset,
  });

  const userEvents: any = await UserEvent.findAll({
    where: {
      userId
    }
  })

  const eventsWithSubscribe = events
    .map(event => {
      const isSubscribed = userEvents.some((userEvent: any) => userEvent.eventId === event.id)
      const { id, title, owner, category, startDate } = event;

      return { id, title, owner, category, startDate, isSubscribed }
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());;

  return eventsWithSubscribe
}

export const getAllEvents = async (req: Request, res: Response) => {
  const { page = 1, perPage = 10, userId } = req.query as { page: string; perPage: string; userId: string };

  try {

    const eventsWithSubscribe = await getEvents({ page: +page, perPage: +perPage, userId })
    res.json({ events: eventsWithSubscribe });

  } catch (error) {
    console.log('Error All Events', error)
    res.status(500).send({ error: 'Something went wrong.' })
  }
}


export const getEventsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const Events = await UserEvent.findAll({
      where: {
        user_id: userId
      }
    })

    res.json({ data: Events })
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong.' })
  }
}

export const addEvent = async (req: Request, res: Response) => {
  const { title, owner, category, startDate } = req.body

  try {
    if (!title || !owner || !category || !startDate) {
      return res.json({ error: 'The following fields must be present: title, owner, category, startDate' })
    }

    await Event.create({
      title,
      owner,
      category,
      startDate
    })
    res.json({ message: 'Event created.' })
  } catch (error) {
    console.log('Cannot add Event: ', error)
    res.status(500).send({ error: 'Something went wrong.' })
  }
}

export const handleUserSubscription = async (req: Request, res: Response) => {
  const { eventId, userId } = req.params as { eventId: string; userId: string };

  try {
    const userEvent = await UserEvent.findOne({
      where: {
        userId,
        eventId
      }
    })

    if (userEvent) {
      await userEvent.destroy()
    }

    if (!userEvent) {
      await UserEvent.create({
        userId,
        eventId
      })

    }


    const eventsWithSubscribe = await getEvents({ userId })

    return res.json({ events: eventsWithSubscribe })
  } catch (error) {
    console.log('Cannot add Event: ', error)
    res.status(500).send({ error: 'Something went wrong.' })
  }
}
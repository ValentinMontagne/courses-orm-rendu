import {Router, Request, Response} from 'express';
import {ZodError} from "zod";
import {createCharacter} from "../../lib/character/character.service";

const router = Router();

router.post('/', async (request: Request, response: Response) => {try {
    const player = await createCharacter(request.body);
    response.json(player);
} catch (error) {
    if (error instanceof ZodError) {
        response.status(400).json({error: error.message});
        return;
    }
    console.log(error);
    response.sendStatus(500);
}
})

router.get('/', (request: Request, response: Response) => {
    response.send('Find');
})

router.get('/:id', (request: Request, response: Response) => {
    response.send('Search');
})

router.put('/:id', (request: Request, response: Response) => {
    response.send('Update');
})

router.patch('/:id', (request: Request, response: Response) => {
    response.send('Patch');
})

router.delete('/:id', (request: Request, response: Response) => {
    response.send('Delete');
})

export const charactersRouter = router;
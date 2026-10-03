import { defaultPracticals } from '../../../../../backend/src/data/defaultData.js';
import Practical from '../../../../../backend/src/models/Practical.js';
import { connectDatabase, databaseIsDisabled, getMongoStatus } from '../../../../../backend/src/config/db.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    if (!databaseIsDisabled()) {
      await connectDatabase();
    }

    if (getMongoStatus()) {
      const practical = await Practical.findOne({ practicalNumber: Number(params.id) });
      if (!practical) {
        return Response.json({ message: 'Practical not found.' }, { status: 404 });
      }
      return Response.json(practical.toObject());
    }

    const practical = defaultPracticals.find((item) => String(item.practicalNumber) === String(params.id));
    if (!practical) {
      return Response.json({ message: 'Practical not found.' }, { status: 404 });
    }
    return Response.json(practical);
  } catch (error) {
    console.error('Failed to load practical details:', error);
    const practical = defaultPracticals.find((item) => String(item.practicalNumber) === String(params.id));
    if (!practical) {
      return Response.json({ message: 'Practical not found.' }, { status: 404 });
    }
    return Response.json(practical);
  }
}
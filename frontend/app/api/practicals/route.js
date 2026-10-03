import { defaultPracticals } from '../../../../backend/src/data/defaultData.js';
import Practical from '../../../../backend/src/models/Practical.js';
import { connectDatabase, databaseIsDisabled, getMongoStatus } from '../../../../backend/src/config/db.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getPracticals() {
  if (!databaseIsDisabled()) {
    await connectDatabase();
  }

  if (getMongoStatus()) {
    const practicals = await Practical.find().sort({ practicalNumber: 1 });
    return practicals.map((practical) => practical.toObject());
  }

  return defaultPracticals;
}

export async function GET() {
  try {
    return Response.json(await getPracticals());
  } catch (error) {
    console.error('Failed to load practicals:', error);
    return Response.json(defaultPracticals);
  }
}
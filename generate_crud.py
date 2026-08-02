import os

models = ["User", "Project", "Service", "Settings", "Blog", "FAQ", "Testimonial", "Team", "Career", "ContactMessage"]

controller_template = """import { Request, Response, NextFunction } from 'express';
import {MODEL_NAME} from '../models/{MODEL_NAME}';

export const create{MODEL_NAME} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await {MODEL_NAME}.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const get{MODEL_NAME}s = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await {MODEL_NAME}.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const get{MODEL_NAME} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await {MODEL_NAME}.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const update{MODEL_NAME} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await {MODEL_NAME}.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const delete{MODEL_NAME} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await {MODEL_NAME}.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
"""

route_template = """import { Router } from 'express';
import {
  create{MODEL_NAME},
  get{MODEL_NAME}s,
  get{MODEL_NAME},
  update{MODEL_NAME},
  delete{MODEL_NAME}
} from '../controllers/{MODEL_NAME}Controller';
import { protect, authorize } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { {MODEL_LOWER}Schema } from '../validators/{MODEL_LOWER}Validator';

const router = Router();

router
  .route('/')
  .get(get{MODEL_NAME}s)
  .post(protect, authorize('admin'), validate({MODEL_LOWER}Schema), create{MODEL_NAME});

router
  .route('/:id')
  .get(get{MODEL_NAME})
  .put(protect, authorize('admin'), validate({MODEL_LOWER}Schema), update{MODEL_NAME})
  .delete(protect, authorize('admin'), delete{MODEL_NAME});

export default router;
"""

validator_template = """import { z } from 'zod';

export const {MODEL_LOWER}Schema = z.object({
  body: z.object({}).passthrough()
});
"""

for model in models:
    # write controller
    with open(f"src/controllers/{model}Controller.ts", "w") as f:
        f.write(controller_template.replace("{MODEL_NAME}", model))
    
    # write route
    with open(f"src/routes/{model}Routes.ts", "w") as f:
        f.write(route_template.replace("{MODEL_NAME}", model).replace("{MODEL_LOWER}", model.lower()))

    # write validator
    with open(f"src/validators/{model.lower()}Validator.ts", "w") as f:
        f.write(validator_template.replace("{MODEL_LOWER}", model.lower()))

# write routes index
index_content = """import { Router } from 'express';\n"""
for model in models:
    index_content += f"import {model.lower()}Routes from './{model}Routes';\n"
index_content += "\n// Upload Route\nimport uploadRoutes from './uploadRoutes';\n"
index_content += "import authRoutes from './authRoutes';\n"
index_content += "\nconst router = Router();\n\n"
for model in models:
    index_content += f"router.use('/{model.lower()}s', {model.lower()}Routes);\n"
index_content += "\nrouter.use('/upload', uploadRoutes);\n"
index_content += "router.use('/auth', authRoutes);\n"
index_content += "\nexport default router;\n"

with open("src/routes/index.ts", "w") as f:
    f.write(index_content)

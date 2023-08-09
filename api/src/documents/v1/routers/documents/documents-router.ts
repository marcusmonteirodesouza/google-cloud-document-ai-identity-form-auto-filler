import {Router} from 'express';
import {USIDsService} from '../../services';

interface DocumentsRouterSettings {
  usIdsService: USIDsService;
}

class DocumentsRouter {
  constructor(private readonly settings: DocumentsRouterSettings) {}

  get router() {
    const router = Router();

    router.post(
      '/ids/countries/us/driver-license/parse',
      async (req, res, next) => {
        try {
          if (!req.files) {
            throw new RangeError('No files were uploaded');
          }

          const fileKeys = Object.keys(req.files);

          if (fileKeys.length !== 1) {
            throw new RangeError('A single file must be uploaded');
          }

          const uploadedFile = req.files[fileKeys[0]];

          if (!('data' in uploadedFile)) {
            throw new Error(
              "The uploaded file should contain the 'data' property"
            );
          }

          const {usIdsService} = this.settings;

          const parsedUSDriverLicense = await usIdsService.parseUSDriverLicense(
            {
              imageData: uploadedFile.data,
              mimeType: uploadedFile.mimetype,
            }
          );

          return res.json(parsedUSDriverLicense);
        } catch (err) {
          return next(err);
        }
      }
    );

    router.post('/ids/countries/us/id-proof', async (req, res, next) => {
      try {
        if (!req.files) {
          throw new RangeError('No files were uploaded');
        }

        const fileKeys = Object.keys(req.files);

        if (fileKeys.length !== 1) {
          throw new RangeError('A single file must be uploaded');
        }

        const uploadedFile = req.files[fileKeys[0]];

        if (!('data' in uploadedFile)) {
          throw new Error(
            "The uploaded file should contain the 'data' property"
          );
        }

        const {usIdsService} = this.settings;

        const idProofingResults = await usIdsService.idProof({
          imageData: uploadedFile.data,
          mimeType: uploadedFile.mimetype,
        });

        return res.json(idProofingResults);
      } catch (err) {
        return next(err);
      }
    });

    router.post('/ids/countries/us/passport/parse', async (req, res, next) => {
      try {
        if (!req.files) {
          throw new RangeError('No files were uploaded');
        }

        const fileKeys = Object.keys(req.files);

        if (fileKeys.length !== 1) {
          throw new RangeError('A single file must be uploaded');
        }

        const uploadedFile = req.files[fileKeys[0]];

        if (!('data' in uploadedFile)) {
          throw new Error(
            "The uploaded file should contain the 'data' property"
          );
        }

        const {usIdsService} = this.settings;

        const parsedUSPassport = await usIdsService.parseUSPassport({
          imageData: uploadedFile.data,
          mimeType: uploadedFile.mimetype,
        });

        return res.json(parsedUSPassport);
      } catch (err) {
        return next(err);
      }
    });

    return router;
  }
}

export {DocumentsRouter};

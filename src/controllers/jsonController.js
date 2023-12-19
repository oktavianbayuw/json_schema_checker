const resultsRepository = require("../repositories/resultsRepository");
const Ajv = require("ajv");

class JsonController {
  async validateAndSave(req, res) {
    const { url_path, jsonData, jsonSchema } = req.body;

    console.log(typeof JSON.parse(jsonData));
    console.log(typeof jsonSchema);
    // Validate JSON against JSON Schema (you need to implement this)
    const isValid = validateJson(JSON.parse(jsonData), JSON.parse(jsonSchema));

    try {
      const existingRecord = await resultsRepository.findOneByField(
        "url_path",
        url_path
      );
      console.log(existingRecord);

      if (existingRecord) {
        // Update existing record
        alert("TERSEDIA PATH HEHE");
        await resultsRepository.updateByField("url_path", url_path, {
          json_schema: jsonSchema,
          status: isValid ? 1 : 0,
          dt_modified: new Date(),
        });
      } else {
        // Insert new record
        await resultsRepository.insert({
          url_path,
          json_schema: jsonSchema,
          status: isValid ? 1 : 0,
          dt_insert: new Date(),
        });
      }

      res.json({
        status: isValid,
        message: isValid ? "Data Valid" : "Data Tidak Valid",
      });
    } catch (error) {
      console.error("Error executing database query:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }
}
const ajv = new Ajv();
function validateJson(jsonData, jsonSchema) {
  try {
    const validate = ajv.compile(jsonSchema);
    return validate(jsonData);
  } catch (error) {
    console.error("Error validating JSON:", error);
    return false;
  }
}

module.exports = new JsonController();

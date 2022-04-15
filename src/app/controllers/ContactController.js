const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
    // Listar todos os registros
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found.' });
    }
    response.json(contact);
    // Obter um registro
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This email is already in use.' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });
    response.json(contact);
    // Criar novo registro
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found.' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This email is already in use.' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
    // Editar um registro
  }

  async delete(request, response) {
    const { id } = request.params;

    // Deletar um registro
    await ContactsRepository.delete(id);

    response.sendStatus(204);
    // 204: No content
  }
}

module.exports = new ContactController();

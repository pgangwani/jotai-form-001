import React from 'react';
import { atom, useAtom } from 'jotai';
import { Plus, Trash2 } from 'lucide-react';

interface Skill {
  name: string;
  years: number;
  level: 'beginner' | 'intermediate' | 'expert';
}

interface AdvancedFormData {
  fullName: string;
  bio: string;
  skills: Skill[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

interface FormErrors {
  fullName?: string;
  bio?: string;
  skills?: string;
}

const initialFormData: AdvancedFormData = {
  fullName: '',
  bio: '',
  skills: [{ name: '', years: 0, level: 'beginner' }],
  notifications: {
    email: false,
    sms: false,
    push: false,
  },
};

const formAtom = atom<AdvancedFormData>(initialFormData);
const formErrorsAtom = atom<FormErrors>({});
const formSubmittedAtom = atom<AdvancedFormData | null>(null);

export function AdvancedForm() {
  const [form, setForm] = useAtom(formAtom);
  const [errors, setErrors] = useAtom(formErrorsAtom);
  const [submitted, setSubmitted] = useAtom(formSubmittedAtom);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!form.bio) {
      newErrors.bio = 'Bio is required';
    }
    if (!form.skills.length) {
      newErrors.skills = 'At least one skill is required';
    } else if (form.skills.some(skill => !skill.name)) {
      newErrors.skills = 'All skills must have a name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSkill = () => {
    setForm({
      ...form,
      skills: [...form.skills, { name: '', years: 0, level: 'beginner' }],
    });
  };

  const removeSkill = (index: number) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== index),
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...form.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setForm({ ...form, skills: newSkills });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(form);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Developer Profile Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </button>
            </div>

            {errors.skills && (
              <p className="mt-1 text-sm text-red-600 mb-2">{errors.skills}</p>
            )}

            <div className="space-y-4">
              {form.skills.map((skill, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      placeholder="Skill name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="w-24">
                    <input
                      type="number"
                      value={skill.years}
                      onChange={(e) => updateSkill(index, 'years', Number(e.target.value))}
                      placeholder="Years"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="0"
                    />
                  </div>

                  <div className="w-36">
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', e.target.value as Skill['level'])}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  {form.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Preferences
            </label>
            <div className="space-y-2">
              {Object.entries(form.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`notifications.${key}`}
                    checked={value}
                    onChange={(e) => setForm({
                      ...form,
                      notifications: {
                        ...form.notifications,
                        [key]: e.target.checked,
                      },
                    })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`notifications.${key}`}
                    className="ml-2 block text-sm text-gray-900 capitalize"
                  >
                    {key}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Profile
          </button>
        </form>

        {submitted && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h3 className="text-sm font-medium text-green-800">Form submitted!</h3>
            <pre className="mt-2 text-sm text-green-700 overflow-auto">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';


// Define a single, stable default object for "new post" mode
const defaultValues = { title: '', content: '', status: 'draft' };

function PostForm({
  // Do not give a new default object here—just accept `initialValues` (or undefined)
  initialValues,
  onSubmit,
  buttonLabel = 'Create'
}) {

  // 1) Initialize formData to either the provided initialValues OR the stable defaultValues
  const [formData, setFormData] = useState(initialValues || defaultValues);
  const [errors, setErrors] = useState({});

  // 2) If initialValues prop changes (e.g. when EditPost fetches the post), update formData
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.content.trim()) errs.content = 'Content is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit(formData);
  };
  console.log('PostForm rendered with:', formData);

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ maxWidth: '600px', margin: '2rem auto' }}
    >
  

      {/* 2. TITLE INPUT */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1.75rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#1a202c'
          }}
        />
        {errors.title && (
          <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            {errors.title}
          </p>
        )}
      </div>

      {/* 3. CONTENT TEXTAREA */}
      <div style={{ padding: '1rem' }}>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          rows="10"
          style={{
            width: '100%',
            height: '300px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '1rem',
            resize: 'vertical',
            background: '#f9fafb',
            color: '#1a202c',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        />
        {errors.content && (
          <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            {errors.content}
          </p>
        )}
      </div>

      {/* 4. STATUS TOGGLE SWITCH */}
      <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="status-toggle" style={{ fontWeight: 500, margin: 0 }}>
          Published:
        </label>
        <label className="switch" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            id="status-toggle"
            type="checkbox"
            checked={formData.status === 'published'}
            onChange={e => setFormData(prev => ({ ...prev, status: e.target.checked ? 'published' : 'draft' }))}
            style={{ display: 'none' }}
          />
          <span
            style={{
              width: '40px',
              height: '22px',
              background: formData.status === 'published' ? '#22c55e' : '#d1d5db',
              borderRadius: '12px',
              position: 'relative',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: formData.status === 'published' ? '20px' : '2px',
                top: '2px',
                width: '18px',
                height: '18px',
                background: '#fff',
                borderRadius: '50%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'left 0.2s',
              }}
            />
          </span>
        </label>
        <span style={{ color: formData.status === 'published' ? '#22c55e' : '#6b7280', fontWeight: 500 }}>
          {formData.status === 'published' ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* 5. SUBMIT BUTTON */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button type="submit" className="btn">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}

export default PostForm;

import { useFormik } from "formik"
import * as yup from 'yup'




function ApplicationForm({jobId, userId, setApplyBtn }) {
  const formSchema = yup.object().shape({
    'status': yup.string().required('status is required')
  })
  const formik = useFormik({
    initialValues: {
      status: "Applied",
      notes: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'application_date': new Date().toLocaleString(),
          ...values,
          'job_id': jobId,
          'user_id': userId,
        })
      })
        .then(r => r.json())
        .then(app => app)
      setApplyBtn(on => !on)
    }
  })
  return (
    <div className="application-form-container">
      <form className="application-form" onSubmit={formik.handleSubmit}>
        <label>Set Status:</label>
        <select name="status" value={formik.values.status} onChange={formik.handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Pending</option>
        </select>
        <label>Add Notes:(optional)</label>
        <textarea name="notes" value={formik.values.notes} onChange={formik.handleChange} />
        <button className="application-submit" type='submit'> Submit Application</button>
      </form>
    </div>

  )



}




export default ApplicationForm
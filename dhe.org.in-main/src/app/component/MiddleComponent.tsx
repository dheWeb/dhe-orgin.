import React from "react";

const DepartmentInfo: React.FC = () => {
  return (
    <div className="bg-white -mt-2 flex flex-col p-2 items-start">
      {/* SEO H1 */}
      <h1 className="text-2xl font-semibold mb-4 text-primary-color">
        About the Department of Holistic Education (DHE)
      </h1>

      <p className="text-justify text-black mb-4">
        To realize the vision of Bharat as a global knowledge leader and emerging
        superpower, education must be rooted in Bharatiya values, strengthened by
        skill development, and committed to the holistic development of every
        learner. True education goes beyond academic scores—it engages the
        heart, mind, and hands, nurturing responsible citizens, innovative
        thinkers, and ethical leaders prepared for global challenges.
      </p>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Vision and Foundation
      </h2>

      <p className="text-justify text-black mb-4">
        Inspired by the transformative educational philosophy of Vidya Bharti,
        the Department of Holistic Education (DHE) was established as a catalyst
        for educational reform, innovation, and thought leadership in India.
        Founded in 2021 under Vidya Bharti Punjab and scaled nationally in 2023
        under the Vidya Bharti Institute of Training &amp; Research (VBITR)
        Trust, DHE has rapidly evolved into a respected, action-oriented national
        platform aligned with the objectives of the National Education Policy
        (NEP) 2020.
      </p>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Role and National Impact
      </h2>

      <p className="text-justify text-black mb-4">
        DHE functions as the intellectual and operational nerve center for
        advancing educational discourse and implementation across India. Its
        core focus areas include driving policy-aligned educational dialogue,
        organizing large-scale national initiatives such as the Shiksha
        Mahakumbh Abhiyan, enabling cross-disciplinary leadership development,
        and designing technology-driven platforms for efficient and transparent
        school and institutional management.
      </p>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Leadership and Thought Direction
      </h2>

      <p className="text-justify text-black mb-4">
        At the helm of DHE is{" "}
        <a
          href="http://www.drthakurskr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary hover:underline"
        >
          Dr. Thakur S. K. R.
        </a>
        , a senior scientist at ISRO and a pioneer in educational experimentation.
        With a deep commitment to value-based, context-sensitive, and
        innovation-driven learning, Dr. Thakur envisions an education ecosystem
        that nurtures character, competence, and creativity—while remaining
        grounded in India’s civilizational ethos and globally relevant
        competencies.
      </p>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Shiksha Mahakumbh Abhiyan: A National Movement
      </h2>

      <p className="text-justify text-black mb-4">
        Through the Shiksha Mahakumbh Abhiyan, DHE has created a dynamic and
        inclusive national platform that brings together educators,
        policymakers, scientists, industry leaders, social reformers, and youth.
        More than a series of conferences, it is a sustained national movement
        focused on addressing pressing educational challenges and shaping the
        future of learning in India.
      </p>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Digital Platforms and Innovation Ecosystem
      </h2>

      <p className="text-justify text-black mb-4">
        DHE actively leads the development of impact-focused digital platforms
        that translate educational vision into daily practice:
      </p>

      <ul className="list-disc pl-6 text-black mb-4">
        <li>
          <a
            href="https://www.tredul.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Tredul
          </a>{" "}
          – Reimagining tourism and experiential learning for modern classrooms
        </li>
        <li>
          <a
            href="https://www.sarvatr.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Sarvatra
          </a>{" "}
          – A unified school resource and data management system
        </li>
        <li>
          <a
            href="https://www.swadeshibazaar.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Swadeshi Bazaar
          </a>{" "}
          – Promoting local innovation and entrepreneurship
        </li>
        <li>
          <a
            href="https://www.jobs360degree.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Jobs 360°
          </a>{" "}
          – Career readiness and employment ecosystem for the school system
        </li>
        <li>
          <a
            href="https://www.tudu.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            TuDu
          </a>{" "}
          – Integrated event and initiative management platform
        </li>
      </ul>

      {/* SEO H2 */}
      <h2 className="text-xl font-semibold mb-2 text-primary-color">
        Knowledge Dissemination and Publications
      </h2>

      <p className="text-justify text-black">
        To ensure that insights, innovations, and policy perspectives reach
        educators, institutions, and decision-makers, DHE publishes two
        quarterly journals—
        <a
          href="https://vbe.rase.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary hover:underline ml-1"
        >
          Viksit Bharat
        </a>{" "}
        and{" "}
        <a
          href="https://vie.rase.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary hover:underline"
        >
          Viksit India
        </a>
        . These publications curate forward-looking ideas, success stories, and
        actionable policy recommendations—reinforcing India’s journey toward
        becoming a Vishwa Guru through education.
      </p>
    </div>
  );
};

export default DepartmentInfo;

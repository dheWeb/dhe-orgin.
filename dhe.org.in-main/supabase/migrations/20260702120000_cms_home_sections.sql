-- Additional CMS keys for home vision and closing CTA

insert into public.site_content (key, label, value) values
  ('home_vision', 'Home vision section', '{"body":"Inspired by the transformative educational philosophy of Vidya Bharati, DHE was established as a catalyst for educational reform, innovation, and thought leadership in India. Founded in 2021 under Vidya Bharti Punjab and scaled nationally in 2023 under the Vidya Bharti Institute of Training & Research (VBITR) Trust, DHE has rapidly evolved into an action-oriented national platform advancing holistic education, skill development, leadership, innovation, and Bharatiya values."}'::jsonb),
  ('home_closing_cta', 'Home closing CTA', '{"title_line1":"Building Bharat as a","title_line2":"Global Knowledge Leader","body":"Through educational transformation, leadership development, innovation ecosystems, research, technology integration, entrepreneurship, and Bharatiya knowledge systems, DHE is committed to shaping the future of education and empowering Bharat''s journey toward becoming a Vishwa Guru."}'::jsonb)
on conflict (key) do nothing;

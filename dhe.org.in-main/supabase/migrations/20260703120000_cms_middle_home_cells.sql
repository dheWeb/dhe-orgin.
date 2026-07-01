-- CMS keys: middle homepage sections, leadership intro, cell page copy

insert into public.site_content (key, label, value) values
  (
    'home_national_impact',
    'Home national impact section',
    '{"body":"DHE functions as the intellectual and operational nerve center for advancing educational discourse and implementation across Bharat. Through policy dialogue, institutional collaboration, leadership development, research initiatives, conferences, and digital platforms, DHE empowers educators, institutions, students, policymakers, and communities.","highlights_json":"[\"National Educational Conferences & Summits\",\"Innovation & Entrepreneurship Ecosystem\",\"Digital Educational Platforms & Solutions\",\"Leadership & Skill Development Initiatives\"]"}'::jsonb
  ),
  (
    'home_leadership',
    'Home leadership section',
    '{"body_prefix":"At the helm of DHE is","leader_name":"Dr. Thakur S. K. R.","leader_url":"http://www.drthakurskr.com","body_suffix":", senior scientist at ISRO and pioneer in educational experimentation. His vision promotes character, competence, creativity, leadership, innovation, and globally relevant education rooted in Bharatiya civilization ethos.","vision_quote":"“Education must empower every learner to become innovative, ethical, skilled, socially responsible, and globally competent while remaining deeply rooted in Bharat’s cultural and spiritual wisdom.”"}'::jsonb
  ),
  (
    'home_shiksha',
    'Home Shiksha Mahakumbh section',
    '{"paragraph1":"Through the Shiksha Mahakumbh Abhiyan, DHE has created a transformative national movement that brings together educators, policymakers, scientists, industry leaders, social reformers, institutions, startups, researchers, and youth from across Bharat and beyond.","paragraph2":"More than a conference, it is a dynamic platform for collaborative educational reform, policy innovation, research dissemination, entrepreneurship development, leadership building, and societal transformation."}'::jsonb
  ),
  (
    'home_digital_ecosystem',
    'Home digital ecosystem intro',
    '{"description":"DHE actively develops impact-driven digital platforms that transform educational vision into practical, scalable, and sustainable systems."}'::jsonb
  ),
  (
    'leadership_intro',
    'Leadership page intro',
    '{"text":"Patrons and members of the Local Management Committee (LMC) governing the Department of Holistic Education."}'::jsonb
  ),
  (
    'cells_shared_intro',
    'Cell pages shared intro',
    '{"text":"Each DHE cell advances a focused mission within the national holistic education ecosystem — collaborating across institutions, research, innovation, and community outreach."}'::jsonb
  ),
  (
    'cell_overrides',
    'Cell page overrides (JSON by slug)',
    '{"json":"{}"}'::jsonb
  )
on conflict (key) do nothing;

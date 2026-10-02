# Physical AI evaluation report template

Protocol version: 0.1 (proposed design). This template contains no run results.

## Evaluation question
Task distribution, success predicates, final-state requirements, time budget, operating envelope, planned sample size, stopping rules and permitted assistance.

## Frozen system
Checkpoint hash, training provenance and overlap, adaptation budget, robot/gripper, sensor and calibration identity, action representation, controller/frequency, inference hardware, runtime/software versions.

## Holdouts and comparison
Development/validation/test manifests grouped by whole episode, session, object and site. Test set access policy. Matched reset distributions and model order. Independent unit and clustering assumptions.

## Trial accounting
Every initiated trial, valid trials, unassisted successes, assisted completions, policy failures, timeouts and stops. Infrastructure-invalid exclusions with registered reasons and replacement records. Never count human-assisted completion as autonomous success.

## Metrics
Numerator and denominator for each task/site/slice; uncertainty method; macro and pooled aggregates with declared weights. Subgoal progress, interventions and human-control time, recovery subset, successful cycle times with timeout fraction, latency, reset burden, throughput and operational incidents with exposure.

## Annotation and judge audit
Coverage denominator and eligible duration, arm-track overlap policy, boundary tolerance, required attributes, reviewers, adjudication, rubric version and model-judge calibration/agreement. Judge probabilities and confidence are not empirical task success or statistical intervals.

## Evidence and reproducibility
Per-episode ledger, synchronized video and observations/actions, event logs, calibration/configs, manifest hashes, analysis code and artifact access terms. Identify estimated image-space motion separately from measured metric motion and joint telemetry.

## Scope and conclusion
Describe tested conditions, untested shifts, exclusions and outstanding failure modes. State whether the pre-registered threshold was met; do not generalize to untested sites, embodiments or tasks.

## Research references
- RoboArena: https://robo-arena.github.io/
- LIBERO: https://github.com/Lifelong-Robot-Learning/LIBERO
- RoboCasa: https://robocasa.ai/docs/build/html/benchmarking/benchmarking_overview.html
- BEHAVIOR: https://behavior.stanford.edu/challenge/evaluation.html
- ManiSkill: https://maniskill.readthedocs.io/en/latest/user_guide/learning_from_demos/setup.html
- LeRobot: https://huggingface.co/docs/lerobot/il_robots
- DROID: https://github.com/droid-dataset/droid_policy_learning
- Wilson intervals: https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/propconf.htm

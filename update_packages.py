import subprocess
import pkg_resources

outdated_packages = [dist.project_name for dist in pkg_resources.working_set if dist.parsed_version < dist.latest_version]

for package in outdated_packages:
    subprocess.check_call([f"pip install --upgrade {package}"], shell=True)

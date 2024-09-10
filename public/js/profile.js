document.getElementById('editProfileButton').addEventListener('click', function() {
    document.getElementById('profileEditForm').classList.remove('hidden');
  });
  
  document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('profileEditForm').classList.add('hidden');
  });
  
  
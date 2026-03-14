from rest_framework import serializers
from .models import Tree

class TreeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tree
        fields = "__all__"
        read_only_fields = ["user","planted_at"]
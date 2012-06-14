require 'spec_helper'

describe Collaborator do
  let(:deck) { FactoryGirl.create(:deck) }
  let(:user) { FactoryGirl.create(:user) }

  it "should only allow owner, editor or viewer roles" do
    %w(owner editor viewer).each do |role|
      should allow_value(role).for(:role)
    end

    subject { Collaborator.new }
    subject.user = user
    subject.deck = deck

    should_not allow_value("foo").for(:role)
  end
end
